import * as os from 'os';
import { S3ClientConfig } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
import getBooleanOption from 'jscommons/dist/config/getBooleanOption';
import getNumberOption from 'jscommons/dist/config/getNumberOption';
import getStringOption from 'jscommons/dist/config/getStringOption';
import getDbFromUrl from 'jscommons/dist/mongoRepo/utils/getDbFromUrl';
import { defaultTo } from 'lodash';

config();

const DEFAULT_EXPRESS_PORT = 8081;
const DEFAULT_TIMEOUT_MS = 55000; // 55 seconds.

const storageDir = `${process.cwd()}/storage`;
const googleKeyFileName = `${process.cwd()}/google.keyfile.json`;
const expressPort = getNumberOption(
  defaultTo(process.env.EXPRESS_PORT, process.env.PORT),
  DEFAULT_EXPRESS_PORT,
);

const accessLogsDir = `${storageDir}/accessLogs`;
const newRelicLogsDir = `${storageDir}/newrelic-agent.log`;
const newRelicLicenseKey = getStringOption(process.env.NEW_RELIC_LICENSE_KEY, '');
const defaultMongoUrl = 'mongodb://localhost:27017/learninglocker_v2';
const mongoUrl = getStringOption(process.env.MONGO_URL, defaultMongoUrl);

const globalAwsRegion = process.env.GLOBAL_AWS_REGION;
const globalAwsIamAccessKeyId = process.env.GLOBAL_AWS_IAM_ACCESS_KEY_ID;
const globalAwsIamAccessKeySecret = process.env.GLOBAL_AWS_IAM_SECRET_ACCESS_KEY;

export default {
  defaultTimeout: getNumberOption(process.env.DEFAULT_TIMEOUT_MS, DEFAULT_TIMEOUT_MS),
  isQueuePriorityEnabled: process.env.ENABLE_QUEUE_PRIORITY === 'true',
  express: {
    allowFormBody: getBooleanOption(process.env.EXPRESS_ALLOW_FORM_BODY, false),
    allowUndefinedMethod: getBooleanOption(process.env.EXPRESS_ALLOW_UNDEFINED_METHOD, false),
    bodyParserLimit: getStringOption(process.env.EXPRESS_BODY_PARSER_LIMIT, '5mb'),
    morganDirectory: getStringOption(process.env.EXPRESS_MORGAN_DIRECTORY, accessLogsDir),
    port: expressPort,
    xAPIPrefix: getStringOption(process.env.XAPI_PREFIX, '/data'),
  },
  azureStorageRepo: {
    account: getStringOption(process.env.FS_AZURE_ACCOUNT),
    accountKey: getStringOption(process.env.FS_AZURE_ACCOUNT_KEY),
    containerName: getStringOption(process.env.FS_AZURE_CONTAINER_NAME, 'll'),
    subFolder: getStringOption(process.env.FS_AZURE_CONTAINER_SUBFOLDER, 'storage'),
  },
  googleStorageRepo: {
    bucketName: getStringOption(process.env.FS_GOOGLE_CLOUD_BUCKET, 'xapi-server'),
    keyFileName: getStringOption(process.env.FS_GOOGLE_CLOUD_KEY_FILENAME, googleKeyFileName),
    projectId: getStringOption(process.env.FS_GOOGLE_CLOUD_PROJECT_ID, 'll'),
    subFolder: getStringOption(process.env.FS_GOOGLE_CLOUD_BUCKET_SUBFOLDER, 'storage'),
  },
  lang: getStringOption(process.env.LANG, 'en'),
  localStorageRepo: {
    storageDir: getStringOption(process.env.FS_LOCAL_STORAGE_DIR, storageDir),
  },
  mongoModelsRepo: {
    dbName: getStringOption(process.env.MONGO_DB, getDbFromUrl(mongoUrl)),
    url: mongoUrl,
  },
  redis: {
    prefix: getStringOption(process.env.REDIS_PREFIX, 'LEARNINGLOCKER'),
    url: getStringOption(process.env.REDIS_URL, 'redis://127.0.0.1:6379/0'),
  },
  repoFactory: {
    authRepoName: getStringOption(process.env.AUTH_REPO, 'mongo'),
    eventsRepoName: getStringOption(process.env.EVENTS_REPO, 'redis'),
    modelsRepoName: getStringOption(process.env.MODELS_REPO, 'mongo'),
    storageRepoName: getStringOption(process.env.STORAGE_REPO, 'local'),
  },
  s3StorageRepo: {
    awsConfig: {
      apiVersion: '2006-03-01',
      region: getStringOption(process.env.FS_S3_REGION, globalAwsRegion),
      tls: true,
      credentials: {
        accessKeyId: getStringOption(process.env.FS_S3_ACCESS_KEY_ID, globalAwsIamAccessKeyId),
        secretAccessKey: getStringOption(
          process.env.FS_S3_SECRET_ACCESS_KEY,
          globalAwsIamAccessKeySecret,
        ),
      },
    } as S3ClientConfig,
    bucketName: getStringOption(process.env.FS_S3_BUCKET, 'xapi-service'),
  },
  statementsService: {
    awaitUpdates: getBooleanOption(
      defaultTo<any>(process.env.SERVICE_AWAIT_UPDATES, process.env.SERVICE_AWAIT_UODATES),
      false,
    ),
    enableActorLowerCasing: getBooleanOption(
      process.env.STATEMENTS_SERVICE_LOWERCASE_ACTORS,
      false,
    ),
    enableActivityUpdates: getBooleanOption(process.env.STATEMENTS_SERVICE_UPDATE_ACTIVITIES),
    enableAttachmentCreation: getBooleanOption(process.env.STATEMENTS_SERVICE_CREATE_ATTACHMENTS),
    enableAttachmentValidation: getBooleanOption(process.env.STATEMENTS_SERVICE_CHECK_ATTACHMENTS),
    enableConflictChecks: getBooleanOption(process.env.STATEMENTS_SERVICE_CHECK_CONFLICTS),
    enableNullRemoval: getBooleanOption(process.env.SERVICE_REMOVE_NULLS, false),
    enableReferencing: getBooleanOption(process.env.STATEMENTS_SERVICE_UPDATE_REFS),
    enableStatementCreation: getBooleanOption(process.env.STATEMENTS_SERVICE_CREATE_STATEMENTS),
    enableVoiding: getBooleanOption(process.env.STATEMENTS_SERVICE_UPDATE_VOIDS),
    enableVoidingChecks: getBooleanOption(process.env.STATEMENTS_SERVICE_CHECK_VOIDS),
  },
  storageSubFolders: {
    activities: getStringOption(process.env.SUB_FOLDER_ACTIVITIES, '/activities'),
    agents: getStringOption(process.env.SUB_FOLDER_AGENTS, '/agents'),
    state: getStringOption(process.env.SUB_FOLDER_STATE, '/state'),
    statements: getStringOption(process.env.SUB_FOLDER_STATEMENTS, '/statements'),
  },
  tracker: {
    newRelic: {
      enabled: newRelicLicenseKey !== '',
      log: getStringOption(process.env.NEW_RELIC_LOG, newRelicLogsDir),
      logLevel: getStringOption(process.env.NEW_RELIC_LOG_LEVEL, 'info'),
      noConfigFile: getStringOption(process.env.NEW_RELIC_NO_CONFIG_FILE, 'true'),
    },
  },
  winston: {
    cloudWatch: {
      awsConfig: {
        accessKeyId: getStringOption(
          process.env.WINSTON_CLOUDWATCH_ACCESS_KEY_ID,
          globalAwsIamAccessKeyId,
        ),
        region: getStringOption(process.env.WINSTON_CLOUDWATCH_REGION, globalAwsRegion),
        secretAccessKey: getStringOption(
          process.env.WINSTON_CLOUDWATCH_SECRET_ACCESS_KEY,
          globalAwsIamAccessKeySecret,
        ),
      },
      enabled: getBooleanOption(process.env.WINSTON_CLOUDWATCH_ENABLED, false),
      level: getStringOption(process.env.WINSTON_CLOUDWATCH_LEVEL, 'info'),
      logGroupName: getStringOption(process.env.WINSTON_CLOUDWATCH_LOG_GROUP_NAME, 'xapi-service'),
      logStreamName: getStringOption(process.env.WINSTON_CLOUDWATCH_LOG_STREAM_NAME, os.hostname()),
    },
    console: {
      level: getStringOption(process.env.WINSTON_CONSOLE_LEVEL, 'info'),
    },
  },
};
