import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { PriceReference } from "../../enums/price-reference.enum";
import { useEffect, useState } from "react";

const ReferencesPage = () => {
    const { table } = useParams();
    const navigate = useNavigate();

    let tableName: string | null = null;

    useEffect(() => {
        if (!tableName) {
            navigate(-1);
        }
    }, [tableName]);

    if (table) {
        const value: PriceReference = parseInt(table) as PriceReference;

        switch (value) {
            case PriceReference.Fipe:
                tableName = 'FIPE';
                break;
            case PriceReference.Molicar:
                tableName = 'Molicar';
                break;
            default:
                tableName = '';
                break;
        }
    }

    return (
        <>
            <Typography variant="h1" component="h1">{tableName}</Typography>
            <Typography variant="h6" component="p">
                Selecione o ano de referência desejado
                <br />
                para listar os veículos disponíveis.
            </Typography>
        </>
    );
};

export default ReferencesPage;