import { createContext } from 'react';

export const ListContext = createContext({
    List: {},
    columns: () => { },
    Breadcrumbs: {},
    MenuID: 0
});


export default ListContext;
