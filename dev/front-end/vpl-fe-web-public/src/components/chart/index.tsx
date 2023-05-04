import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
} from 'chart.js';
import { Vehicle } from "../../models/vehicle";
import { useEffect, useState } from "react";
import { ApiResult, ApiResultStatus } from "../../models/api-result-model";
import useListEvaluationsByVehicleId from "../../hooks/evaluation/use-list-evaluations-by-vehicle-id";
import { Evaluation } from "../../models/evaluation";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)

const ChartPage = ({ id }: Vehicle) => {

    const [evaluationsResult, setEvaluationsResult] = useState<ApiResult>(ApiResult.start());

    const listEvaluationsByVehicleId = useListEvaluationsByVehicleId();

    const fetchData = async () => {
        setEvaluationsResult(await listEvaluationsByVehicleId(id));
    };

    useEffect(() => {
        if (evaluationsResult.status === ApiResultStatus.loading) {
            if (id > 0)
                fetchData();
        }
    });



    const data = {
        labels: ['2018'],
        datasets: [
            {
                label: 'Valores por ano',
                data: [67000],
                backgroundColor: 'aqua',
                borderColor: 'aqua',
                pointBorderColor: 'blue',
                fill: true,
                tension: 0.4
            }
        ]
    }

    const options = {
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

export default ChartPage;