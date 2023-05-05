import {
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip
} from 'chart.js';
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import useListEvaluationsByVehicleId from "../../hooks/evaluation/use-list-evaluations-by-vehicle-id";
import { ApiResult, ApiResultStatus } from "../../models/api-result-model";
import { Evaluation } from "../../models/evaluation";
import { PriceReference } from '../../enums/price-reference.enum';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)

interface ChartComponentProps {
    vehicleId: number,
    priceReference: PriceReference
}

const ChartComponent = ({ vehicleId, priceReference }: ChartComponentProps) => {

    const [evaluationsResult, setEvaluationsResult] = useState<ApiResult>(ApiResult.start());

    const listEvaluationsByVehicleId = useListEvaluationsByVehicleId();

    const fetchData = async () => {
        setEvaluationsResult(await listEvaluationsByVehicleId(vehicleId, priceReference));
    };

    useEffect(() => {
        if (evaluationsResult.status === ApiResultStatus.loading && vehicleId > 0) {
            fetchData();
        }
    });

    const data = {
        labels: Array.of<string>(),
        datasets: [
            {
                label: 'Valores por ano',
                data: Array.of<number>(),
                backgroundColor: priceReference === PriceReference.Fipe ? 'aqua' : 'lime',
                borderColor: priceReference === PriceReference.Fipe ? 'aqua' : 'lime',
                pointBorderColor: priceReference === PriceReference.Fipe ? 'blue' : 'olive',
                fill: 'start',
                tension: 0.4
            }
        ]
    }

    const options: any = {
        plugins: {
            legend: true
        },
        scales: {
            y: {
                // min: 1,
                // max: 20
            }
        }
    }

    return (
        evaluationsResult.status === ApiResultStatus.success && evaluationsResult.data.length > 0 &&
        evaluationsResult.data.map((evaluation: Evaluation) => (
            data.labels.push(evaluation.year.toString()),
            data.datasets.find(x => x.data)?.data.push(evaluation.value)
        )),


        <>
            {evaluationsResult.status === ApiResultStatus.loading && <p>Carregando...</p>}

            {evaluationsResult.status === ApiResultStatus.error && <p>Erro: {evaluationsResult.errorMessage}</p>}

            {evaluationsResult.status === ApiResultStatus.success && evaluationsResult.data.length > 0 &&

                <>
                    <div style={{
                        width: '600px',
                        height: '300px',
                        padding: '20px'
                    }}>

                        <Line
                            data={data}
                            options={options}>
                        </Line>
                    </div>
                </>
            }

            {evaluationsResult.status === ApiResultStatus.success && evaluationsResult.data.length === 0 &&
                <p>:( Nenhum Registro Encontrado</p>
            }
        </>
    );
}

export default ChartComponent;