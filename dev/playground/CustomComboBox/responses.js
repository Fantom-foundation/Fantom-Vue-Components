import { clone } from '@/utils';

const data = [
    { value: 1, label: 'Armstrong' },
    { value: 2, label: 'Laurene' },
    { value: 3, label: 'Shelley' },
    { value: 4, label: 'Sukey' },
    { value: 5, label: 'Scarlett' },
    { value: 6, label: 'Phyllida' },
    { value: 7, label: 'Adara' },
    { value: 8, label: 'Brandon' },
    { value: 9, label: 'Hedwiga' },
    { value: 10, label: 'Misha' },
    { value: 11, label: 'Maurita' },
    { value: 12, label: 'Jamill' },
    { value: 13, label: 'Humfrid' },
    { value: 14, label: 'Cleo' },
    { value: 15, label: 'Beverly' },
    { value: 16, label: 'Concordia' },
    { value: 17, label: 'Brandi' },
    { value: 18, label: 'Sebastien' },
    { value: 19, label: 'Rosabelle' },
    { value: 20, label: 'Rycca' },
    { value: 21, label: 'Bevvy' },
    { value: 22, label: 'Dorena' },
    { value: 23, label: 'Goran' },
    { value: 24, label: 'Fiann' },
    { value: 25, label: 'Eva' },
    { value: 26, label: 'Dionis' },
    { value: 27, label: 'Terrence' },
    { value: 28, label: 'Amalia' },
    { value: 29, label: 'Ford' },
    { value: 30, label: 'Tommy' },
    /*{ value: 31, label: 'Ronald' },
    { value: 32, label: 'Donnie' },
    { value: 33, label: 'Ash' },
    { value: 34, label: 'Annalise' },
    { value: 35, label: 'Liana' },
    { value: 36, label: 'Elenore' },
    { value: 37, label: 'Gabi' },
    { value: 38, label: 'Bordie' },
    { value: 39, label: 'Alfred' },
    { value: 40, label: 'Sonia' },
    { value: 41, label: 'Pattie' },
    { value: 42, label: 'Darla' },
    { value: 43, label: 'Evan' },
    { value: 44, label: 'Sophi' },
    { value: 45, label: 'Benedetta' },
    { value: 46, label: 'Gilbert' },
    { value: 47, label: 'Bord' },
    { value: 48, label: 'Myrah' },
    { value: 49, label: 'Ernaline' },
    { value: 50, label: 'Rudie' },
    { value: 51, label: 'Hubie' },
    { value: 52, label: 'Tybi' },
    { value: 53, label: 'Florry' },
    { value: 54, label: 'Miran' },
    { value: 55, label: 'Darline' },
    { value: 56, label: 'Tedda' },
    { value: 57, label: 'Latrina' },
    { value: 58, label: 'Lesli' },
    { value: 59, label: 'Annecorinne' },
    { value: 60, label: 'Vyky' },
    { value: 61, label: 'Lissy' },
    { value: 62, label: 'Dur' },
    { value: 63, label: 'Theodore' },
    { value: 64, label: 'Dionysus' },
    { value: 65, label: 'Letisha' },
    { value: 66, label: 'Ruthe' },
    { value: 67, label: 'Veradis' },
    { value: 68, label: 'Isidro' },
    { value: 69, label: 'Eba' },
    { value: 70, label: 'Bernardo' },
    { value: 71, label: 'Mitchel' },
    { value: 72, label: 'Alikee' },
    { value: 73, label: 'Rubie' },
    { value: 74, label: 'Mureil' },
    { value: 75, label: 'Tracie' },
    { value: 76, label: 'Ida' },
    { value: 77, label: 'Alphard' },
    { value: 78, label: 'Corri' },
    { value: 79, label: 'Martelle' },
    { value: 80, label: 'Faun' },
    { value: 81, label: 'Maisey' },
    { value: 82, label: 'Lila' },
    { value: 83, label: 'Mallorie' },
    { value: 84, label: 'Harmon' },
    { value: 85, label: 'Braden' },
    { value: 86, label: 'Tiffanie' },
    { value: 87, label: 'Marc' },
    { value: 88, label: 'Amata' },
    { value: 89, label: 'Abdul' },
    { value: 90, label: 'Norean' },
    { value: 91, label: 'Amby' },
    { value: 92, label: 'Anatole' },
    { value: 93, label: 'Ebenezer' },
    { value: 94, label: 'Genvieve' },
    { value: 95, label: 'Jorge' },
    { value: 96, label: 'Janifer' },
    { value: 97, label: 'Colin' },
    { value: 98, label: 'Kellsie' },
    { value: 99, label: 'Cecily' },
    { value: 100, label: 'Amye' },*/
];

export function fetchComboBoxData(_timeout = 1000) {
    return new Promise(_resolve =>
        setTimeout(() => {
            _resolve({
                totalItems: data.length,
                data: clone(data),
            });
        }, _timeout)
    );
}

export function fetchPagedComboBoxData(_timeout = 1000, _pagination) {
    return new Promise(_resolve =>
        setTimeout(() => {
            let ldata = clone(data);
            const { filterText } = _pagination;

            console.log('filterText: ', filterText);

            ldata = ldata.filter(_item => _item.label.indexOf(filterText) > -1);

            _resolve({
                totalItems: ldata.length,
                data: ldata.slice(
                    (_pagination.currPage - 1) * _pagination.perPage,
                    _pagination.currPage * _pagination.perPage
                ),
            });
        }, _timeout)
    );
}
