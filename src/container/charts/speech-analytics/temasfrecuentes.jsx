import { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import speechData from '../../../db/speech.json';

export class TemasFrecuentesChart extends Component {
    constructor(props) {
        super(props);

        const topicFrequencyData = this.processTopicFrequencyData('todos');

        this.state = {
            activeFilter: 'todos',
            series: [{
                name: 'Frecuencia',
                data: topicFrequencyData.frequencies
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 320,
                    states: {
                        hover: {
                            filter: {
                                type: 'darken',
                                value: 0.8,
                                color: '#2A437C'
                            }
                        }
                    },
                    events: {
                        mounted: (chart) => {
                            chart.windowResizeHandler();
                        }
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '80%',
                        distributed: true,
                        dataLabels: {
                            position: 'bottom'
                        },
                    }
                },
                colors: Array(10).fill('#6A8BFF'),
                grid: {
                    borderColor: '#f2f5f7',
                },
                dataLabels: {
                    enabled: true,
                    textAnchor: 'start',
                    style: {
                        colors: ['#fff']
                    },
                    formatter: function (val, opt) {
                        return val;
                    },
                    offsetX: 0,
                    dropShadow: {
                        enabled: false
                    }
                },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                xaxis: {
                    categories: topicFrequencyData.topics,
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    }
                },
                yaxis: {
                    labels: {
                        show: true,
                        style: {
                            colors: "#8c9097",
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-yaxis-label',
                        },
                        maxWidth: 400
                    }
                },
                title: {
                    align: 'center',
                    style: {
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#444'
                    },
                },
                tooltip: {
                    theme: 'dark',
                    y: {
                        formatter: function (val) {
                            return val + " ocurrencias";
                        }
                    }
                },
                legend: {
                    show: false
                }
            }
        };
    }


    handleFilterChange = (filter) => {
        this.setState({ activeFilter: filter }, () => {
            this.updateChartData(filter);
        });
    }


    updateChartData(filter) {
        const topicFrequencyData = this.processTopicFrequencyData(filter);
        
        this.setState({
            series: [{
                name: 'Frecuencia',
                data: topicFrequencyData.frequencies
            }],
            options: {
                ...this.state.options,
                xaxis: {
                    ...this.state.options.xaxis,
                    categories: topicFrequencyData.topics
                }
            }
        });
    }

    processTopicFrequencyData(filter = 'todos') {
        const temasPrincipales = speechData["Tema Principal"];
        
        // Filter topics by role if needed
        const filteredTopics = filter === 'todos' 
            ? temasPrincipales 
            : temasPrincipales.filter(item => item.rol === filter);
        
        // Sort topics by frequency in descending order
        const sortedTopics = [...filteredTopics].sort((a, b) => b.frecuencia - a.frecuencia);
        
        // Extract topic names and frequency values
        const topics = sortedTopics.map(item => item.tema_principal);
        const frequencies = sortedTopics.map(item => item.frecuencia);
        
        return {
            topics,
            frequencies
        };
    }

    renderFilterButtons() {
        const { activeFilter } = this.state;
        const buttonStyle = {
            padding: '2px 2px',
            margin: '0 2px 2px 0',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600,
            border: '1px solid #6A8BFF',
            transition: 'all 0.3s ease'
        };

        const activeStyle = {
            ...buttonStyle,
            backgroundColor: '#6A8BFF',
            color: 'white'
        };

        const inactiveStyle = {
            ...buttonStyle,
            backgroundColor: 'white',
            color: '#6A8BFF'
        };

        return (
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <button 
                    style={activeFilter === 'todos' ? activeStyle : inactiveStyle}
                    onClick={() => this.handleFilterChange('todos')}
                >
                    Todos
                </button>
                <button 
                    style={activeFilter === 'agente' ? activeStyle : inactiveStyle}
                    onClick={() => this.handleFilterChange('agente')}
                >
                    Agente
                </button>
                <button 
                    style={activeFilter === 'cliente' ? activeStyle : inactiveStyle}
                    onClick={() => this.handleFilterChange('cliente')}
                >
                    Cliente
                </button>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderFilterButtons()}
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={400} />
            </div>
        );
    }
}