module.exports = {
    pdfLista: function (dados) { 
        return ` 
        <style>
            table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            table-layout: fixed;
            width: 100%;
            }
            
            td, th {
            border: 1px solid #dddddd;
            text-align: left;
            font-size: 10px;
            padding: 8px;
            }
            
            tr:nth-child(even) {
            background-color: #dddddd;
            }
        </style>
        <table>
          ${dados}
        </table>
        `             
    },

    pdfReciboEmprestimo: function (dados, img) { 
        return `
        <div id='pageHeader'>
            <img 
                style= "
                position: absolute;
                top: 140px; 
                left: 80px;
                opacity: 0.15;
                filter:alpha(opacity=15);"
                src="${img}"
            />
        </div>
        <div style="margin-top: 80px">
            <h2 style="font-size: 1.2em; text-align:center">Recibo de empréstimo</h2>
            <p style="font-size: 0.6em; text-align:center"> 
                Identificação do usuário: <span style="font-weight: bold;">${dados.cpf}</span><br>
                ID do exemplar: <span style="font-weight: bold;">${dados.idExemplar}</span><br>
                Data do empréstimo: <span style="font-weight: bold;">${dados.dataEmprestimo}</span><br>
                Data para devolução: <span style="font-weight: bold;">${dados.dataPrevisao}</span><br>
            </p>
        </div>
        `             
    }
}
