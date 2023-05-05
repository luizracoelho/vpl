import { Table, TableRow, TableCell, TableHead, TableBody, TableContainer } from "@mui/material";
import { useState, useEffect } from "react";
import { ApiResult, ApiResultStatus } from "../../../models/api-result-model";
import { Evaluation } from "../../../models/evaluation";
import useListEvaluationsByVehicleId from "../../../hooks/evaluation/use-list-evaluations-by-vehicle-id";
import { PriceReference } from "../../../enums/price-reference.enum";

interface VehiclePriceReferenceTableProps {
    vehicleId: number;
    priceReference: PriceReference
}

const VehiclePriceReferenceTable = ({ vehicleId, priceReference }: VehiclePriceReferenceTableProps) => {

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
                                <TableCell sx={{ borderRight: '3px solid white', textAlign: 'center', width: '50%', fontSize: '1.2rem' }}>Ano</TableCell>
                                <TableCell sx={{ textAlign: 'center', width: '50%', fontSize: '1.2rem' }}>Valor</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                evaluationsResult.data.map((evaluation: Evaluation) => (
                                    <TableRow key={`${evaluation.referenceYearId}-${evaluation.year}`}>
                                        <TableCell sx={{ textAlign: 'center', width: '50%', height: '100%', borderRight: '3px solid white' }}>
                                            {evaluation.year}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', width: '50%' }}>
                                            {evaluation.value}
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

