import { rows } from './data.js';
import { clone } from '@/utils';
import { compareLocalizedStringProperty } from '@/utils/array-sorting.js';

export function fetchRows(_timeout = 1000) {
    return new Promise(_resolve =>
        setTimeout(() => {
            _resolve({
                totalItems: rows.length,
                rows: clone(rows),
            });
        }, _timeout)
    );
}

export function fetchPagedRows(_timeout = 1000, _page = 1, _perPage = 20, _sortBy = '', _sortDir = 'desc') {
    return new Promise(_resolve =>
        setTimeout(() => {
            const data = clone(rows);

            if (_sortBy) {
                data.sort(compareLocalizedStringProperty(_sortBy, _sortDir));
            }

            _resolve({
                totalItems: rows.length,
                rows: data.slice((_page - 1) * _perPage, _page * _perPage),
            });
        }, _timeout)
    );
}
