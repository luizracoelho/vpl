import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Evaluation } from "../../../models/evaluation";

interface VehiclePriceReferenceTableProps {
    evaluations: Evaluation[];
    yearSelect: number
}

const VehiclePriceReferenceTable = ({ evaluations, yearSelect }: VehiclePriceReferenceTableProps) => {
    return (
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
                        evaluations.map((evaluation: Evaluation) => (
                            <TableRow key={`${evaluation.referenceYearId}-${evaluation.year}`}>
                                <TableCell sx={{ textAlign: 'center', width: '50%', height: '100%', borderRight: '3px solid white', color: evaluation.year === yearSelect ? 'primary.main' : 'inherit' }}>
                                    {evaluation.year}
                                </TableCell>

                                <TableCell sx={{ textAlign: 'center', width: '50%', color: evaluation.year === yearSelect ? 'primary.main' : 'inherit' }}>
                                    {evaluation.value}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VehiclePriceReferenceTable;

