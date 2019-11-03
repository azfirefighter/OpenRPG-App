import * as React from 'react';
import { Grid, Form, Table, Input, List } from 'semantic-ui-react';
import ORPGLogo from '../assets/images/d20_transparent.png';
import { die_eval, swap_drop, allow_drop, start_drag } from '../ts/scripts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

require('../css/section.css');



export default class WelcomeScreen extends React.Component<any, any> {
    private value: string = '';

    public render() {
        return (
            <div className='section-template'>
                <div id='welcome-section' className='section js-section is-shown'>
                    <div className='welcome-header'>
                        <img src={ORPGLogo} height={45} />
                        <h1>OpenRPG</h1>
                        <h2>Your tabletop RPG workbench</h2>
                    </div>

                    <Grid className='container'>
                        <Grid.Row className='row'>
                            <this.GettingStarted />
                            <this.HomeUtils />
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        );
    }

    private GettingStarted = () => {
        return (
            <Grid.Column width={4}>
                <div className='getting-started'>
                    <h3>Start</h3>
                    <ul>
                        <li>
                            <a href='#'>New Character</a>
                        </li>
                        <li>
                            <a href='#'>Open Something...</a>
                        </li>
                        <li>
                            <a href='#'>Import Something...</a>
                        </li>
                    </ul>
                </div>
                <div className='getting-started'>
                    <h3>Recent</h3>
                    <ul>
                        <li>No recent stuff</li>
                    </ul>
                </div>
                <div className='getting-started'>
                    <h3>Help</h3>
                    <ul>
                        <li>
                            <a href='#' target='_blank' id='docs'>
                                Documentation
                            </a>
                        </li>
                        <li>
                            <a href='#' target='_blank' id='repo'>
                                Github Repository
                            </a>
                        </li>
                        <li>
                            <a href='#' target='_blank' id='blog'>
                                Blog
                            </a>
                        </li>

                        <script type='text/javascript'>
                            document.getElementById("docs").href = pkginfo.website.docs;
                            document.getElementById("repo").href = pkginfo.repository.url;
                            document.getElementById("blog").href = pkginfo.website.blog;
                        </script>
                    </ul>
                </div>
            </Grid.Column>
        );
    }

    private handleCalcInputChange = (event: React.ChangeEvent<HTMLInputElement>, data: any) => {
        // TODO some logic tbd
    }

    /**
     * NOTE(incomingstick): I highly doubt this is the conventional way to do this 🤷 ‍
     */
    private Calculator = () => {
        const calcBtnClass = 'btn btn-fill btn-rect';

        return (
            <>
                <a href='#die-calculator' data-toggle='collapse' className='utility'>
                    <FontAwesomeIcon
                        icon={faPlus}
                    />
                    Die Calculator {this.value}
                </a>
                <div id='die-calculator' className='collapse'>
                    <Form name='calc'>
                        <Table id='calc' border={0}>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell colSpan={3}>
                                        <Input
                                            id='calc-display'
                                            className='btn btn-rect'
                                            name='display'
                                            type='text'
                                            value={this.value}
                                            onChange={this.handleCalcInputChange}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='C'
                                            onClick={() => (this.value = '')}
                                            title='Clear'
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='1'
                                            onClick={() => (this.value += '1')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='2'
                                            onClick={() => (this.value += '2')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='3'
                                            onClick={() => (this.value += '3')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='+'
                                            onClick={() => (this.value += '+')}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='4'
                                            onClick={() => (this.value += '4')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='5'
                                            onClick={() => (this.value += '5')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='6'
                                            onClick={() => (this.value += '6')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='-'
                                            onClick={() => (this.value += '-')}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='7'
                                            onClick={() => (this.value += '7')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='8'
                                            onClick={() => (this.value += '8')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='9'
                                            onClick={() => (this.value += '9')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='x'
                                            onClick={() => (this.value += '*')}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='d'
                                            onClick={() => (this.value += 'd')}
                                            title='XdY'
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='0'
                                            onClick={() => (this.value += '0')}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            id='calc-eval'
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='='
                                            onClick={() => (this.value = die_eval(this.value).toString())}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            className={calcBtnClass}
                                            type={'button'}
                                            value='/'
                                            onClick={() => (this.value += '/')}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Form>
                </div>
            </>
        );
    }

    private HomeUtils = () => {
        return (
            <Grid.Column width={11}>
                <div className='homepage-utils'>
                    <h3>Utilities</h3>
                    <List>
                        {/* <!-- TODO All of these should be collapsed when program starts --> */}
                        <List.Item className='utils-panel'>
                            <this.Calculator />
                        </List.Item>

                        {/* <!-- TODO add name generator here --> */}
                        <List.Item className='utils-panel'>
                            <a href='#name-generator' data-toggle='collapse' className='utility'>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                />
                                TODO Name Generator here
                            </a>
                            <div id='name-generator' className='collapse'>
                                <div className='inner-utility'>Lorem ipsum dolor text....</div>
                            </div>
                        </List.Item>

                        {/* <!-- TODO Finish this
                                        - Ensure security of accepting label input
                                        - Allow adding more tags
                                        - Allow removing tags. Currently if a tag becomes empty it no longer allows  --> */}
                        <List.Item className='utils-panel'>
                            <a href='#initiative-helper' data-toggle='collapse' className='utility'>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                />
                                TODO Initiative Helper here
                            </a>
                            <div id='initiative-helper' className='collapse'>
                                <List ordered className='inner-utility'>
                                    <List.Item
                                        id='li1'
                                        onDrop={swap_drop}
                                        onDragOver={allow_drop}>
                                        <div
                                            id='drag1'
                                            draggable={true}
                                            onDragStart={start_drag}
                                            className='editable'>
                                            Char 1
                                        </div>
                                    </List.Item>
                                    <List.Item
                                        id='li2'
                                        onDrop={swap_drop}
                                        onDragOver={allow_drop}>
                                        <div
                                            id='drag2'
                                            draggable={true}
                                            onDragStart={start_drag}
                                            className='editable'>
                                            Char 2
                                        </div>
                                    </List.Item>
                                    <List.Item
                                        id='li3'
                                        onDrop={swap_drop}
                                        onDragOver={allow_drop}>
                                        <div
                                            id='drag3'
                                            draggable={true}
                                            onDragStart={start_drag}
                                            className='editable'>
                                            Char 3
                                        </div>
                                    </List.Item>
                                    <List.Item
                                        id='li4'
                                        onDrop={swap_drop}
                                        onDragOver={allow_drop}>
                                        <div
                                            id='drag4'
                                            draggable={true}
                                            onDragStart={start_drag}
                                            className='editable'>
                                            Char 4
                                        </div>
                                    </List.Item>
                                </List>
                            </div>
                        </List.Item>
                    </List>
                </div>
            </Grid.Column>
        );
    }
}
