import { Table, TableRow, TableCell, TableHead, TableBody, TableContainer } from "@mui/material";
import { useState, useEffect } from "react";
import { ApiResult, ApiResultStatus } from "../../../models/api-result-model";
import { Evaluation } from "../../../models/evaluation";
import useListEvaluationsByVehicleId from "../../../hooks/evaluation/use-list-evaluation-by-vehicle-id";

interface VehiclePriceReferenceTableProps {
    vehicleId: number;
}

const VehiclePriceReferenceTable = ({ vehicleId }: VehiclePriceReferenceTableProps) => {

    const [evaluationsResult, setEvaluationsResult] = useState<ApiResult>(ApiResult.start());

    const listEvaluationsByVehicleId = useListEvaluationsByVehicleId();

    const fetchData = async () => {
        setEvaluationsResult(await listEvaluationsByVehicleId(vehicleId));
    };

    useEffect(() => {
        if (evaluationsResult.status === ApiResultStatus.loading && vehicleId > 0) {
            fetchData();
        }
    });

    return (
        <>
            {evaluationsResult.status === ApiResultStatus.loading && <p>Carregando...</p>}

            {evaluationsResult.status === ApiResultStatus.error && <p>Erro: {evaluationsResult.errorMessage}</p>}

            {evaluationsResult.status === ApiResultStatus.success && evaluationsResult.data.length === 0 &&
                <p>:( Nenhum Registro Encontrado</p>
            }

            {evaluationsResult.status === ApiResultStatus.success && evaluationsResult.data.length > 0 &&

                <TableContainer sx={{ maxWidth: '500px' }}>
                    <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 8px', '& td': { border: 'none', padding: '8px', maxWidth: '80px', lineHeight: 1.2 }, '& th': { border: 'none', padding: '8px', lineHeight: 1.2 } }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ borderRight: '3px solid white', textAlign: 'center', width: '50%', fontSize: '1.2rem' }}>FIPE</TableCell>
                                <TableCell sx={{ textAlign: 'center', width: '50%', fontSize: '1.2rem' }}>MOLICAR</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                evaluationsResult.data.map((evaluation: Evaluation) => (
                                    <TableRow key={`${evaluation.referenceYearId}-${evaluation.year}`} sx={{ '& > *:first-child': { borderRight: '3px solid white', height: '100%' } }}>
                                        <TableCell sx={{ textAlign: 'center', width: '50%', height: '100%', borderRight: '3px solid white' }}>
                                            {evaluation.year} -  {evaluation.value}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', width: '50%' }}>
                                            {evaluation.year} -  {evaluation.value}
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            }
        </>
    );
};

export default VehiclePriceReferenceTable;

