export const columns = [
    {
        dataIndex: 'id',
        key: 'id',
        title: 'Id',
        slots: {title: 'customTitle'},
        scopedSlots: {customRender: 'id'},
    },
    {
        title: 'Thumbnail',
        dataIndex: 'image',
        key: 'thumbnail',
        scopedSlots: {customRender: 'thumbnail'},
        width: '15%'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        scopedSlots: {customRender: 'price'},
    },
    {
        title: 'Action',
        key: 'action',
        scopedSlots: {customRender: 'action'},

    },
];