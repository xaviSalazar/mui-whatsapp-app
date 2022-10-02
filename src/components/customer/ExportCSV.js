import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Download as DownloadIcon } from '../../icons/download';
import { Button } from '@mui/material';

export const ExportCSV = ({contacts, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (contacts, fileName) => {
       if (contacts.length >= 1){
        const ws = XLSX.utils.json_to_sheet(contacts);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    else alert("File is empty! Can't Export")
    }

    return (
        <Button
            startIcon={(<DownloadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
            onClick={(e) => exportToCSV(contacts,fileName)}
          >
            Exportar Excel
          </Button>
    )

}