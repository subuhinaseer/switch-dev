import {useStore} from 'mobx-store-provider';
import RootStore from '../stores/rootStore';
import {useCallback, useEffect, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {requests, utils} from '../helpers';

export const useRootStore = () => {
  const store = useStore(RootStore);
  return store;
};

export const useDeviceEvent = eventName => {
  const [event, setEvent] = useState();
  useEffect(() => {
    if (eventName) {
      let subscription = DeviceEventEmitter.addListener(eventName, data => {
        setEvent(data);
      });
      return subscription.remove;
    }
  }, [eventName]);

  const _setEvent = data => {
    DeviceEventEmitter.emit(eventName, data);
  };
  return [event, _setEvent];
};

export const useFetchData = ({
  url = '',
  path = 'results',
  requestId = '',
  meta = [],
} = {}) => {
  const [res, setRes] = useState([] as any);
  const [metadata, setMetadata] = useState({});
  const [errors, setErrors] = useState();

  const fetchData = useCallback(async () => {
    const {data, ok, originalError} = await requests.get(url);
    if (ok) {
      const {page} = data;
      if (page > 1) {
        const newValues = (path ? utils.getObject(data, path) : data) as any;
        setRes([...res, ...newValues]);
      } else {
        setRes(path ? utils.getObject(data, path) : data);
      }

      const m = {};
      meta.map(key => {
        m[key as string] = utils.getObject(data, key);
      });
      meta.length > 0 && setMetadata(m);
      if (errors) {
        setErrors(undefined);
      }
    } else {
      setErrors(originalError);
    }
  }, [path, url, errors, meta, res]);

  useEffect(() => {
    url && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, path, requestId]);
  return {res, errors, setRes, meta: metadata};
};
