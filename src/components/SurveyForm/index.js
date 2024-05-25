/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  useForm,
  FormProvider,
  Controller,
  useFormContext,
} from 'react-hook-form';

import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {HelperText, Text} from 'react-native-paper';
import {requests, url, utils} from '../../helpers';
import {colors, font} from '../../theme';
import Input from '../CustomInput';
import {Button} from 'react-native-paper';
import {ExpressionExecutor} from './libraries/conditions';
import {useMMKVObject} from 'react-native-mmkv';
import AntDesign from 'react-native-vector-icons/AntDesign';
import _ from 'lodash';
import {t} from '../../localization';
import Loading from '../Loading';
import {storage} from '../../helpers/storage';

export function MultipleTextInput(props) {
  const {element, name} = props;
  return (
    <View style={style.multipleTextContainer}>
      <Text numberOfLines={1} style={style.multipleTextTitle}>
        {element.title}
      </Text>
      <View style={style.multipleTextInputs}>
        {element.items.map((item, j) => (
          <View
            key={`${j}`}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              minWidth: item.startWithNewLine ? '100%' : '50%',
            }}>
            <Element
              key={`${j}`}
              name={name ? `${name}.${element.name}` : `${element.name}`}
              element={item}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const DynamicPanel = props => {
  const {
    panel,
    panelIndex,
    name,
    element,
    minPanelCount,
    panelsLength,
    removePanel,
  } = props;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  return (
    <View style={style.panelContainer}>
      {panel.slice(0, isCollapsed ? 1 : undefined).map((item, j) => (
        <Element
          extraProps={{
            panelIndex,
          }}
          key={`${panelIndex},${j}`}
          name={
            name
              ? `${name}.${element.name}.${panelIndex}`
              : `${element.name}.${panelIndex}`
          }
          element={item}
        />
      ))}
      {panelsLength > 2 && (
        <View style={style.panelCollapseIcon}>
          <AntDesign
            onPress={toggleCollapse}
            size={22}
            name={isCollapsed ? 'up' : 'down'}
            color={colors.grey}
          />
        </View>
      )}

      {panelsLength > minPanelCount && (
        <View style={style.panelCloseIcon}>
          <AntDesign
            onPress={removePanel}
            size={22}
            name="minuscircle"
            color={colors.warning}
          />
        </View>
      )}
    </View>
  );
};

export function PanelDynamicInput(props) {
  const {watch, setValue} = useFormContext(); // retrieve all hook methods
  const {element, name} = props;
  const [panels, setPanels] = useState([element.templateElements]);

  const {
    minPanelCount = 1,
    maxPanelCount = 100,
    panelAddText = t('Add new entry'),
  } = element;
  const {initialPanelCount = minPanelCount} = props;
  const addPanel = useCallback(() => {
    setPanels([...panels, element.templateElements]);
  }, [panels]);

  useEffect(() => {
    if (panels.length < initialPanelCount) {
      addPanel();
    }
  }, [initialPanelCount]);

  const removePanel = useCallback(
    (panel, panelIndex) => {
      setPanels(panels.filter((p, i) => i !== panelIndex));
    },
    [panels],
  );

  return (
    <View style={style.flex1}>
      <Text style={style.dynamicPanelTextTitle}>{element.title}</Text>
      {element.description && (
        <Text style={style.description}>{element.description}</Text>
      )}
      {panels.map((panel, panelIndex) => (
        <DynamicPanel
          removePanel={() => removePanel(panel, panelIndex)}
          key={panelIndex}
          panel={panel}
          panelIndex={panelIndex}
          name={name}
          element={element}
          minPanelCount={minPanelCount}
          panelsLength={panels.length}
        />
      ))}
      {panels.length < maxPanelCount && (
        <Button
          style={style.addPanelButton}
          mode="outlined"
          icon="plus"
          dark
          onPress={addPanel}>
          {panelAddText}
        </Button>
      )}
    </View>
  );
}

export function Element(props) {
  const {element, name = '', extraProps = {}} = props;
  const {
    control,
    setFocus,
    watch,
    getValues,
    setValue,
    formState: {errors},
  } = useFormContext(); // retrieve all hook methods
  const {
    visibleIf: elementVisibleIf,
    inputType,
    type: elementType,
    name: elementName,
    expression,
    choicesByUrl: _choicesByUrl,
    visible,
    ...restElementProps
  } = element; //
  const _name = [name, elementName].filter(p => p).join('.');
  const [formData, setFormData] = useState(getValues());
  const [visibleIf, setVisibleIf] = useState(true);
  const [choicesByUrl, setChoicesByUrl] = useState(
    _choicesByUrl ? {..._choicesByUrl} : _choicesByUrl,
  );
  const [expressionValue, setExpressionValue] = useState();
  const expressionExecutor = new ExpressionExecutor(elementVisibleIf);

  const calculateExpressionValue = useCallback(
    values => {
      let value;
      if (expression) {
        const panelId = _name.split('.').slice(0, -1).join('.');
        const _expression = expression.replaceAll('panel.', `${panelId}.`);
        const expressionExecutor2 = new ExpressionExecutor(_expression);
        expressionExecutor2.expression = _expression;
        value = expressionExecutor2.run(values);
      }
      return value;
    },
    [expression],
  );

  useEffect(() => {
    if (elementVisibleIf) {
      expressionExecutor.expression = elementVisibleIf;
      const _visibleIf = expressionExecutor.run(formData);
      if (visibleIf !== _visibleIf) {
        setVisibleIf(_visibleIf);
      }
    } else if (_choicesByUrl?.url) {
      const newChoiceUrl = formatString(_choicesByUrl?.url);
      if (newChoiceUrl !== choicesByUrl.url) {
        setChoicesByUrl({...choicesByUrl, url: newChoiceUrl});
      }
    }
  }, [element, formData, _choicesByUrl?.url]);

  useEffect(() => {
    const _expressionValue = calculateExpressionValue(formData);
    if (_expressionValue && _expressionValue !== expressionValue) {
      setExpressionValue(_expressionValue);
    }
  }, [formData]);

  useEffect(() => {
    if (expressionValue) {
      setValue(_name, expressionValue);
    }
  }, [_name, expressionValue]);

  useEffect(() => {
    const firstError = Object.keys(errors).reduce((field, a) => {
      return errors[field] ? field : a;
    }, null);
    if (_name && _name.startsWith(firstError) && _name.split('.').length > 1) {
      setFocus(_name, {shouldSelect: true});
    }
  }, [errors, setFocus]);

  useEffect(() => {
    if (elementVisibleIf || expression) {
      const {unsubscribe} = watch(updatedFormData);
      return unsubscribe;
    }
  }, [watch, expression, elementVisibleIf]);

  const updatedFormData = useCallback(
    value => {
      if (!_.isEqual(value, formData)) {
        setFormData(value);
      }
      const _expressionValue = calculateExpressionValue(formData);
      if (_expressionValue && _expressionValue !== expressionValue) {
        setExpressionValue(_expressionValue);
      }
      if (_choicesByUrl?.url) {
        const newChoiceUrl = formatString(_choicesByUrl?.url, value);
        if (newChoiceUrl !== choicesByUrl.url) {
          setChoicesByUrl({...choicesByUrl, url: newChoiceUrl});
        }
      }
    },
    [_choicesByUrl, choicesByUrl],
  );
  const formatString = (str, data = {}) => {
    if (str?.includes('{')) {
      return utils.replaceVariablesFromString(
        str,
        {
          ...formData,
          ...extraProps,
          ...data,
        },
        ['{', '}'],
      );
    } else {
      return str;
    }
  };

  const getKeyboardType = useCallback(() => {
    const possibleMatches = {
      text: 'default',
      radiogroup: 'radiogroup',
      dropdown: 'dropdown',
      checkbox: 'dropdown',
      boolean: 'boolean',
      number: 'decimal-pad',
      expression: 'expression',
      tel: 'phone-pad',
      // date picker
      time: 'time',
      rating: 'rating',
      datetime: 'datetime',
      'datetime-local': 'datetime',
      date: 'datetime',
      // image selections
      imagepicker: 'imagepicker',
      currentLocation: 'currentLocation',
      location: 'currentLocation',
      file: 'file',
    };
    if (elementName.startsWith('geo:')) {
      return elementName.split(':')[1];
    } else {
      return (
        possibleMatches[inputType] || possibleMatches[elementType] || 'default'
      );
    }
  }, []);

  if (!visibleIf) {
    return null;
  } else {
    switch (elementType) {
      case 'multipletext':
        return <MultipleTextInput element={element} name={name} />;
      case 'paneldynamic':
        const initialPanelCount = formData
          ? formData[elementName]?.length
          : undefined;
        return (
          <PanelDynamicInput
            initialPanelCount={initialPanelCount}
            element={element}
            name={name}
          />
        );
      case 'expression':
        return (
          <Controller
            name={_name}
            control={control}
            rules={rules}
            render={({field: {onChange, onBlur, value}}) =>
              visible === false && !visibleIf ? null : (
                <Input
                  {...restElementProps}
                  onBlur={onBlur}
                  label={formatString(element.title)}
                  placeholder={formatString(
                    element.placeholder || element.title,
                  )}
                  onChangeText={_value => onChange(expressionValue?.toString())}
                  editable={false}
                  value={expressionValue?.toString()}
                  setValue={setValue}
                />
              )
            }
          />
        );

      default:
        const keyboardType = getKeyboardType();

        const rules = element.rules || {
          required: element.isRequired || false,
        };
        const error = utils.getObject(errors, _name)?.type;
        const secureTextEntry = inputType === 'password';

        return (
          <Controller
            name={_name}
            control={control}
            rules={rules}
            render={({field: {onChange, onBlur, value}}) =>
              visible === false ? null : (
                <Input
                  {...restElementProps}
                  choicesByUrl={choicesByUrl}
                  value={value}
                  errorMessage={error}
                  secure
                  onBlur={onBlur}
                  label={formatString(element.title)}
                  placeholder={formatString(element.placeholder)}
                  secureTextEntry={secureTextEntry}
                  multiline={
                    ['checkbox', 'comment'].includes(element.type) ||
                    element.multiline
                  }
                  keyboardType={keyboardType}
                  onChangeText={_value => onChange(_value)}
                  inputType={inputType}
                  setValue={setValue}
                />
              )
            }
          />
        );
    }
  }
}

export default function SurveyForm(props) {
  /**
   * Renders a form from surveyjs like schema...for now only supports
   * multipletext, checkboxes and other primitive inputs
   */
  const {
    defaultValues = {},
    containerStyle,
    surveyId,
    navigation,
    title,
    FormButton,
    resetForm,
    showPageTitle = false,
  } = props;
  const [schema, setSchema] = useState(props.schema);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [surveyData, setSurveyData] = useState();
  const [pageIndex, setPageIndex] = useState(0);
  const [cachedSurveys = {}, setCachedSurveys] =
    useMMKVObject('surveys.cached');
  const methods = useForm({defaultValues});
  const pagesCount = useCallback(schema?.pages?.length || 1, [schema]);
  const hasSubmittedRef = useRef();
  const hasSubmitted = hasSubmittedRef.current;
  const setHasSubmitted = v => (hasSubmittedRef.current = v);

  useEffect(() => {
    if (resetForm) {
      resetDefaultValues();
    }
  }, [resetForm]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!_.isEqual(props.schema, schema)) {
      setSchema(props.schema);
    }
  }, [props.schema]);

  useEffect(() => {
    if (surveyId) {
      getSurvey();
    }
  }, [surveyId]);

  useEffect(() => {
    if (surveyData && navigation && !title) {
      navigation.setOptions({title: surveyData.data.title});
    }
  }, [surveyData]);

  useEffect(() => {
    // get values on exit and save them locally
    if (schema) {
      const values = getCachedValues();
      if (values) {
        methods.reset(values);
      }
    }
    return () => {
      // cache form data if hasn't submitted the form yet;
      if (!hasSubmitted) {
        const currentValues = methods.getValues();
        setCachedValues(currentValues);
      }
    };
  }, [schema]);

  const getCachedValues = () => {
    const {cookieName} = schema;
    if (cookieName) {
      return storage.get(cookieName);
    }
    return undefined;
  };

  const setCachedValues = values => {
    const {cookieName} = schema;
    if (cookieName) {
      storage.set(cookieName, values);
    }
  };

  const resetDefaultValues = () => {
    setCachedValues(undefined);
    methods.reset({});
    setTimeout(reloadForm, 200);
  };

  const getSurvey = useCallback(async () => {
    try {
      const {data: res} = await requests.get(
        url.getURL('survey.getSurvey', {item: {surveyId}}),
      );
      if (res?.json) {
        setSchema(res.json);
        setSurveyData(res);
        setErrorMessage('');
        // meas can be catched offline
        if (res.cookieName && res.cookieName.split(':')[1] === '1') {
          setCachedSurveys({
            ...cachedSurveys,
            [surveyId]: res,
          });
        }
      } else {
        setErrorMessage(JSON.stringify(res));
      }
    } catch (error) {
      const res = cachedSurveys[surveyId];
      if (res) {
        setSchema(res.json);
        setSurveyData(res);
        utils.toast(t('Using offline version of the survey'));
      } else {
        setErrorMessage(
          JSON.stringify(error.data?.detail || error.data || error.message),
        );
      }
    }
  }, []);

  const onComplete = useCallback(
    async (data, extraOptions) => {
      /*

      */
      setIsLoading(true);
      Alert.alert('Submitted data', JSON.stringify(data));
    },
    [surveyData],
  );

  const onError = error => {
    __DEV__ && console.log('errors', error);
  };

  const onSubmit = async data => {
    setErrorMessage('');
    if (pagesCount - 1 > pageIndex) {
      const {onPageChange} = props;
      if (onPageChange) {
        const [nextPageIndex, err] = await onPageChange(data, pageIndex);
        if (err) {
          setErrorMessage(err);
        }
        setPageIndex(nextPageIndex);
      } else {
        setPageIndex(pageIndex + 1);
      }
    } else {
      const {success, errors} =
        (await (props.onSubmit ? props.onSubmit(data) : onComplete(data))) ||
        {};
      if (success === undefined || success === true) {
        setCachedValues(undefined);
        setHasSubmitted(true);
        resetDefaultValues();
      } else if (errors) {
        setErrorMessage(errors.join('; '));
      }
    }
  };

  const reloadForm = () => {
    setIsMounted(false);
    setTimeout(() => {
      setIsMounted(true);
    }, 100);
  };

  if (!isMounted || !schema) {
    return <Loading />;
  }

  return (
    <View style={[style.root, containerStyle]}>
      <FormProvider {...methods}>
        <ScrollView>
          {showPageTitle && (
            <Text style={style.pageTitle}>
              {schema?.pages[pageIndex].title}
            </Text>
          )}
          <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.select({ios: 20, android: 0})}
            behavior={Platform.select({ios: 'padding', default: undefined})}>
            {schema?.pages[pageIndex].elements.map((element, index) => (
              <View key={`${element.name}-${index}`}>
                <Element element={element} />
              </View>
            ))}
            {FormButton && (
              <FormButton
                onPress={methods.handleSubmit(onSubmit, onError)}
                disabled={isLoading}
                // errors={errors}
              />
            )}
            {errorMessage && (
              <HelperText type="error">{errorMessage}</HelperText>
            )}
            {props.children &&
              cloneElement(
                props.children,
                {
                  disabled: isLoading,
                  pageIndex,
                  pagesCount,
                  setPageIndex,
                  onPress: methods.handleSubmit(onSubmit, onError),
                },
                null,
              )}
          </KeyboardAvoidingView>
        </ScrollView>
      </FormProvider>
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 20,
    width: '100%',
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 6,
    paddingBottom: 6,
  },
  flex1: {flex: 1},
  submitButton: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  elementContainer: {
    backgroundColor: colors.white,
    marginVertical: 4,
    padding: 4,
  },
  multipleTextContainer: {
    margin: 2,
    backgroundColor: 'rgba(240,240,240, .5)',
    paddingVertical: 10,
    borderRadius: 10,
  },
  multipleTextInputs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  multipleTextTitle: {
    paddingLeft: 10,
    fontSize: 16,
    // fontFamily: font.medium,
    // fontWeight: 'bold',
    // color: colors.primary,
  },
  dynamicPanelTextTitle: {
    paddingLeft: 4,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: font.regular,
    fontWeight: 'bold',
    // color: colors.grey,
  },
  description: {
    paddingLeft: 5,
    fontSize: 14,
    fontFamily: font.light,
    paddingBottom: 10,
  },
  panelContainer: {
    margin: 2,
    borderColor: colors.grey,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    flexWrap: 'nowrap',
  },
  panelCloseIcon: {
    position: 'absolute',
    right: 6,
    top: 3,
  },
  panelCollapseIcon: {
    position: 'absolute',
    right: 40,
    top: 0,
  },
  addPanelButton: {
    marginBottom: 10,
  },
});
