import { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import speechData from '../../../db/speech.json';

export class DurationTimeChart extends Component {
    constructor(props) {
        super(props);

        const durationData = this.processDurationData();

        this.state = {
            series: [
                {
                    name: 'Conversaciones por intervalo',
                    data: durationData.averages
                }
            ],
            options: {
                chart: {
                    type: 'bar',
                    height: 320,
                    toolbar: {
                        show: true,
                        tools: {
                            download: true,
                            selection: true,
                            zoom: true,
                            zoomin: true,
                            zoomout: true,
                            pan: true,
                            reset: true
                        }
                    },
                    events: {
                        mounted: (chart) => {
                            chart.windowResizeHandler();
                        }
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '80%',
                        distributed: true,
                        dataLabels: {
                            position: 'bottom'
                        }
                    }
                },
                grid: {
                    show: true,
                    xaxis: {
                        lines: {
                            show: true
                        }
                    },
                    yaxis: {
                        lines: {
                            show: true
                        }
                    },
                    borderColor: '#f2f5f7'
                },
              
                colors: Array(20).fill('#6A8BFF'),
                dataLabels: {
                    enabled: true,
                    textAnchor: 'start',
                    style: {
                        colors: ['#fff']
                    },
                    formatter: function (val) {
                        return val; // Muestra el número de conversaciones
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
                    title: {
                        text: 'Cantidad de conversaciones'
                    },
                    labels: {
                        show: true,
                        style: {
                            colors: '#8c9097',
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-label'
                        }
                    }
                },
                yaxis: {
                    categories: durationData.timeRanges,
                    title: {
                        text: 'Duración (en intervalos de 1 min)'
                    },
                    labels: {
                        show: true,
                        style: {
                            colors: '#8c9097',
                            fontSize: '11px',
                            fontWeight: 600,
                            cssClass: 'apexcharts-yaxis-label'
                        },
                        maxWidth: 400
                    }
                },
                tooltip: {
                    theme: 'dark',
                    y: {
                        formatter: function (val) {
                            return val + ' conversaciones';
                        }
                    }
                },
                title: {
                    
                    // text: 'Conversaciones por duración (por minuto)',
                    align: 'center',
                    style: {
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#444'
                    }
                },
                legend: {
                    show: false
                }
            }
        };
    }

    processDurationData() {
        const conversations = speechData["Análisis de Conversaciones"];
        
        const timeIntervals = {};
        for (let i = 0; i < 20; i++) {
            timeIntervals[i] = 0;
        }
        
        conversations.forEach(conv => {
            const durationMinutes = conv.duracion / 60;
            // Solo consideramos conversaciones de menos de 20 minutos
            if (durationMinutes < 20) {
                const intervalIndex = Math.floor(durationMinutes);
                timeIntervals[intervalIndex]++;
            }
        });

        const timeRanges = [];
        const averages = [];

        for (let i = 0; i < 20; i++) {
            timeRanges.push(`${i} - ${i + 1} min`);
            averages.push(timeIntervals[i]);
        }

        return {
            timeRanges,
            averages
        };
    }

    render() {
        return (
            <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                height={320}
            />
        );
    }
}
