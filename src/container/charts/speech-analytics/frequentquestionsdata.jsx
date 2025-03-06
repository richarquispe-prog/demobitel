import { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import speechData from '../../../db/speech.json';

export class FrequentQuestionsChart extends Component {
    constructor(props) {
        super(props);

        // Process the speech data to get frequent questions
        const questionFrequencyData = this.processQuestionFrequencyData();

        this.state = {
            series: [{
                name: 'Frecuencia',
                data: questionFrequencyData.frequencies
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
                    categories: questionFrequencyData.questions,
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
                    // text: 'Preguntas Más Frecuentes',
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

    processQuestionFrequencyData() {
        // Extraer las preguntas y sus frecuencias del JSON
        const questionData = [];
        
        // Recorrer los datos para encontrar preguntas y frecuencias
        for (let i = 1; i <= 200; i++) { // Limitamos a 200 para no procesar todo el archivo
            const entry = Object.values(speechData).find(item => 
                Array.isArray(item) && item.some(entry => 
                    entry.id === i && entry.pregunta && entry.frecuencia
                )
            );
            
            if (entry) {
                const question = entry.find(item => item.id === i);
                if (question && question.pregunta && question.frecuencia) {
                    questionData.push({
                        pregunta: question.pregunta,
                        frecuencia: question.frecuencia
                    });
                }
            }
        }
        
        // Ordenar por frecuencia en orden descendente
        const sortedData = questionData.sort((a, b) => b.frecuencia - a.frecuencia);
        
        // Tomar las 15 preguntas más frecuentes
        const topQuestions = sortedData.slice(0, 15);
        
        // Extraer preguntas y frecuencias para el gráfico
        const questions = topQuestions.map(item => item.pregunta);
        const frequencies = topQuestions.map(item => item.frecuencia);
        
        return {
            questions,
            frequencies
        };
    }

    render() {
        return (
            <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={400} />
        );
    }
}