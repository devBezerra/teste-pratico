export function defaultTimestampColumns() {
    return [
        {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
        },
        {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
        },
        {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
        },
    ];
}
