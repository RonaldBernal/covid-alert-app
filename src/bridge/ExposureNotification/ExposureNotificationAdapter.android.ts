import {ExposureNotification, ExposureSummary} from './types';
import {getLastExposureTimestamp} from './utils';

export default function ExposureNotificationAdapter(exposureNotificationAPI: any): ExposureNotification {
  return {
    ...exposureNotificationAPI,
    detectExposure: async (configuration, diagnosisKeysURLs) => {
      if (diagnosisKeysURLs.length === 0) {
        throw new Error('Attempt to call detectExposure with empty list of downloaded files');
      }
      let summary: ExposureSummary;
      // for (const diagnosisKeysURL of diagnosisKeysURLs) {
      //   summary = await exposureNotificationAPI.detectExposure(configuration, [diagnosisKeysURL]);
      //   summary.lastExposureTimestamp = getLastExposureTimestamp(summary);
      //   // first detected exposure is enough
      //   if (summary.matchedKeyCount > 0) break;
      // }
      const fakeSummaryNotExposed = {
        daysSinceLastExposure: 12345,
        lastExposureTimestamp: 0,
        matchedKeyCount: 0,
        maximumRiskScore: 0,
        attenuationDurations: [0, 0, 0],
      };
      const fakeSummaryExposed = {
        daysSinceLastExposure: 13,
        lastExposureTimestamp: 1600033420298,
        matchedKeyCount: 1,
        maximumRiskScore: 4,
        attenuationDurations: [20, 0, 0],
      };
      [fakeSummaryNotExposed, fakeSummaryExposed].forEach((x: ExposureSummary) => {
        if (x.maximumRiskScore >= configuration.minimumRiskScore) {
          summary = x;
        }
      });
      return summary!;
      // return fakeSummary3;
    },
    getPendingExposureSummary: async () => {
      const summary = await exposureNotificationAPI.getPendingExposureSummary();
      if (summary) {
        summary.lastExposureTimestamp = getLastExposureTimestamp(summary);
      }
      const fakeSummary2 = {
        daysSinceLastExposure: 1,
        lastExposureTimestamp: 1601067024557,
        matchedKeyCount: 1,
        maximumRiskScore: 1,
        attenuationDurations: [5, 0, 0],
      };
      // return summary;
      // return fakeSummary2;
      return null;
    },
  };
}
