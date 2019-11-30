module.exports = {
    pdfCertificado: function (dados) { 
        return `
        `             
    },

    pdfReciboEmprestimo: function (dados, img, aut) { 
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
                Código do exemplar: <span style="font-weight: bold;">${dados.codExemplar}</span><br> 
                Código do empréstimo: <span style="font-weight: bold;">${dados.dateEmprestimo}</span><br> 
                Código da devolução: <span style="font-weight: bold;">${dados.dateDevolucao}</span><br>
                Autenticador: <span style="font-weight: bold;">${aut}</span>
            </p>
        </div>
        `             
    }
}
