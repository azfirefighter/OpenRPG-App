import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import Sidebar from './layout/sidebar';
import Titlebar from './layout/titlebar';
import CharacterScreen, { TCharacterState, TCharacterSaveState } from './characters/characterScreen';
import CampaignScreen from './campaign';
import CitiesScreen from './cities';
import SettingsScreen from './settings';
import WorldMapsScreen from './worldMaps';
import WelcomeScreen from './welcome';
import { ipcRenderer } from 'electron';
import { TSettingsData } from '../../common/services/settingsService';
import log from '../../common/log';

type TAppContainerState = {
    screen: string;
    characterScreenState?: TCharacterState;
};

class AppContainer extends React.Component<any, TAppContainerState> {
    private characterState: TCharacterSaveState;

    public constructor(props: any, context?: any) {
        super(props, context);

        // TODO can this become async?
        const settings = ipcRenderer.sendSync('sync-settings-get') as TSettingsData;
        const defScreen = settings.lastWindow !== undefined ? settings.lastWindow : 'welcome';

        this.state = {
            screen: defScreen
        };

        this.characterState = {
            names: settings.openCharacters !== undefined ? settings.openCharacters : [],
            currIndex: 0
        };
    }

    public render() {
        return (
            <>
                <Titlebar />
                <div id='wrapper'>
                    <div id='sidebar-wrapper' role='navigation'>
                        <Sidebar clickCallback={this.sidebarCallback} screen={this.state.screen} />
                    </div>

                    <main id='main-content-wrapper'>
                        <this.CurrentScreen />
                    </main>
                </div>
                <footer>
                    <div className='container'>
                        <p>TODO Notification stuff here maybe? And chat stuff maybe?</p>
                    </div>
                </footer>
            </>
        );
    }

    private sidebarCallback = (callbackData: string) => {
        ipcRenderer.send('settings-updated', { lastWindow: callbackData }); // This lags the program

        this.setState({ screen: callbackData });
    };

    private characterScreenCallback = (state: TCharacterSaveState) => {
        log.info('[App Container] characterScreenCallback state ', state);

        ipcRenderer.send('settings-updated', { openCharacters: state.names });

        this.characterState = state;
    };

    private CurrentScreen = () => {
        if (this.state.screen === 'characters')
            return (
                <CharacterScreen
                    characterScreenSaveState={this.characterState}
                    characterScreenSaveCallback={this.characterScreenCallback}
                />
            );
        else if (this.state.screen === 'cities') return <CitiesScreen />;
        else if (this.state.screen === 'world-maps') return <WorldMapsScreen />;
        else if (this.state.screen === 'campaign') return <CampaignScreen />;
        else if (this.state.screen === 'settings') return <SettingsScreen />;
        else return <WelcomeScreen />;
    };
}

const App = () => <AppContainer />;

export default hot(App);
