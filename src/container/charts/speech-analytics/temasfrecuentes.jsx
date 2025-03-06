import { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import speechData from '../../../db/speech.json';

export class TemasFrecuentesChart extends Component {
    constructor(props) {
        super(props);

        const topicFrequencyData = this.processTopicFrequencyData();

        this.state = {
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

    processTopicFrequencyData() {
        const conversations = speechData["Análisis de Conversaciones"];
        
        const topicMap = new Map();
        
        conversations.forEach(conv => {
            const topic = conv.tema_principal;
            if (topic) {
                topicMap.set(topic, (topicMap.get(topic) || 0) + 1);
            }
        });
        
        const topicArray = Array.from(topicMap, ([topic, freq]) => ({ topic, freq }));
        const sortedTopics = topicArray.sort((a, b) => b.freq - a.freq);
        
        const topTopics = sortedTopics.slice(0, 15);
        
        const topics = topTopics.map(item => item.topic);
        const frequencies = topTopics.map(item => item.freq);
        
        return {
            topics,
            frequencies
        };
    }

    render() {
        return (
            <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={400} />
        );
    }
}