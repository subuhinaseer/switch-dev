import {types as t, flow} from 'mobx-state-tree';
export const CurrentActivityModel = t
  .model('CurrentActivity', {
    name: t.maybeNull(t.string),
    isUploading: t.optional(t.boolean, false),
    uploadProgress: t.optional(t.number, 0),
    notificationsCount: t.optional(t.number, 0),
    errors: t.optional(t.array(t.string), []),
    selectedTransactionType: t.optional(t.string, 'sales'),
    onboardingStep: t.optional(t.string, 'login'),
    filters: t.optional(t.string, '{}'), //date filters
    currency: t.optional(t.string, 'TZS'),
  })
  .actions(self => ({
    update(data) {
      Object.keys(self).map(key => {
        let value = data[key];
        if (![undefined].includes(value)) {
          self[key] = value;
        }
      });
    },
    setOnboardingStep(step) {
      self.onboardingStep = step;
    },
    setFilters(data) {
      self.filters = JSON.stringify(data);
    },
    getFilters(data) {
      return JSON.parse(self.filters);
    },
    setSelectedTransactionType(name) {
      self.selectedTransactionType = name;
    },
    setNotificationsCount(count) {
      self.notificationsCount = count;
    },
    setActivityStartTime(timestamp) {
      self.activity_start_time = timestamp;
    },

    setName: flow(function* (activity) {
      self.is_activity_paused = false;
      self.name = activity;
      self.activity_start_time = new Date().getTime();
    }),
    reset: flow(function* () {
      self.name = null;
      self.activity_start_time = null;
      self.is_activity_paused = false;
      self.battery_level = -1;
      self.errors = [];
    }),
    addError(error) {
      self.errors.push(error);
    },
    resetErrors() {
      self.errors = [];
    },
    setIsUploading(isUploading) {
      self.isUploading = isUploading;
    },
  }));
