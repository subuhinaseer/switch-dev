import {useEffect, useState} from 'react';
import {requests, utils} from '../../../helpers';
import {useDebouncedCallback} from 'use-debounce';
type iProps = {
  searchText: string;
  valueName: string;
  titleName: string;
  path: string;
  url: string;
  defaultValue: Array<any>;
  extraKeys: Array<any>;
};

export function useChoicesByUrl(props: iProps) {
  const {
    searchText = '',
    valueName,
    titleName,
    path,
    defaultValue,
    url,
    extraKeys = [],
  } = props;
  /*choicesByUrl: {
        "url": "https://api.yagete.co.tz/survey/api/v1/Survey/d/stockManager.items/",
        "path": "results",
        "valueName": "name",
        "titleName": "name"
       }
       */
  const [choices, setChoices] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const debouncedFetchData = useDebouncedCallback(
    link => fetchData(link),
    800,
    {trailing: true, leading: true},
  );

  useEffect(() => {
    if (defaultValue) {
      const formattedValues = defaultValue.map(c => {
        const choice = typeof c === 'object' ? c : {value: c, text: c};
        extraKeys.map(([key, getValue]) => {
          choice[key] = getValue(c, choice);
        });
        return choice;
      });
      setChoices(formattedValues as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  useEffect(() => {
    url && debouncedFetchData(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, url]);

  async function fetchData(link: string) {
    const {
      data: res,
      ok,
      originalError,
    } = await requests.get(
      link || utils.stringify({search: searchText}, {baseURL: url}),
    );
    if (ok) {
      const results = res[path];
      setChoices(
        results.map((i: any) => {
          const choice = {
            text: utils.getObject(i, titleName),
            value: utils.getObject(i, valueName),
          };
          extraKeys.map(([key, getValue]) => {
            choice[key] = getValue(i, choice);
          });
          return choice;
        }),
      );
    } else {
      setErrorMessage(JSON.stringify(res || originalError.message));
    }
  }
  return {choices, errorMessage};
}
