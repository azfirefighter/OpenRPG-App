import log from '../log';
import { ISettingsService } from './settingsService';
import * as EventEmitter from 'events';

const { autoUpdater } = require('electron-updater');

export interface IUpdateService {
    isUpdateAvailable(): Promise<boolean>;
    startCheckingForUpdates(): Promise<void>;
    pauseCheckingForUpdates(): Promise<void>;
    events(): EventEmitter;
}

export default function updateServiceFactory(settings: ISettingsService, callback: Function) {
    const emitter = new EventEmitter();

    // TODO time since last update
    let updateTimerHandle: any = null;

    autoUpdater.logger = log;

    /**
     * PerformUpdateCheck
     *
     * Performs a single check for whether we shoud download data from the server.
     */
    async function performUpdateCheck() {
        emitter.emit('update-check-started');

        autoUpdater.checkForUpdatesAndNotify();

        try {
            autoUpdater.on('update-available', () => {
                emitter.emit('update-completed');
            });
        } catch (e) {
            emitter.emit('update-failed');
            throw e;
        }
    }

    let updateInProgress = false;

    const factory = {
        events() {
            return emitter;
        },

        /**
         * StartCheckingForUpdates
         *
         * Begins the update cycle and starts to sync new data from server to client
         */
        async startCheckingForUpdates() {
            if (updateInProgress) {
                return;
            }

            log.info('startCheckingForUpdates');
            if (updateTimerHandle) {
                clearTimeout(updateTimerHandle);
                updateTimerHandle = null;
            }

            updateInProgress = true;

            try {
                await performUpdateCheck();
            } catch (e) {
                throw e;
            } finally {
                updateInProgress = false;
                updateTimerHandle = setTimeout(
                    () => this.startCheckingForUpdates(),
                    settings.get().updateTimerMinutes * 1000 * 60
                );
            }
        },

        /**
         * StopCheckingForUpdates
         */
        stopCheckingForUpdates() {
            log.info('stopCheckingForUpdates');
            if (updateTimerHandle) {
                clearTimeout(updateTimerHandle);
                updateTimerHandle = null;
            }
        }
    };

    callback(null, factory);
}
