export default function CustomTable({ columns, rows }: any) {
    console.log(rows)
    return (
        <table className="tabela-usuarios">
            <thead>
                <tr>
                    {columns.map((column: any) => (
                        <th>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    rows.map((row: any) => (
                        <tr key={row[0].id}>
                            {
                                row[0].map((value: any) => (
                                    <td> {value}</td>

                                ))

                            }
                        </tr>
                    ))
                }
            </tbody>
        </table >
    )
}