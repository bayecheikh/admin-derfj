export default () => ({
    listanalyserisques: [],

    headeranalyserisques : [

        { text: 'REF Projet', value: 'reference_projet'},
        { text: 'Date', value: 'date_enquette'},
        { text: 'Titre projet', value: 'titre_projet'},
        { text: 'Secteur', value: 'libelle_secteur'},
        { text: 'Prénom Bénéficiaire', value: 'prenom_beneficiaire'},
        { text: 'Nom Bénéficiaire', value: 'nom_beneficiaire'},
        { text: 'Téléphone', value: 'telephone_beneficiaire'},
        { text: 'Adresse', value: 'adresse_beneficiaire'},
        { text: 'Région', value: 'region'},
        { text: 'Departement', value: 'departement'},
        { text: 'Commune', value: 'commune'},
        { text: 'Status', value: 'status'},
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    headeranalyserisqueavances : [
        { text: 'REF Projet', value: 'reference_projet'},
        { text: 'Date', value: 'date_enquette'},
        { text: 'Titre projet', value: 'titre_projet'},
        { text: 'Prénom Bénéficiaire', value: 'prenom_beneficiaire'},
        { text: 'Nom Bénéficiaire', value: 'nom_beneficiaire'},
        { text: 'Téléphone', value: 'telephone_beneficiaire'},
        { text: 'Adresse', value: 'adresse_beneficiaire'},
        { text: 'Région', value: 'region'},
        { text: 'Departement', value: 'departement'},
        { text: 'Commune', value: 'commune'},
        { text: 'Status', value: 'status'},
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    detailanalyserisque :{},
    //Intialise la pagination
    paginationanalyserisque :{},
    totalPage :1,
    perPage :15,
    currentPage :1,
    dataSearch :null
})