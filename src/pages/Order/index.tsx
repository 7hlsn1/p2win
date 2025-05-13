import React, { useState } from 'react'
import styles from './Order.module.scss'
import { Api, TLoader } from '../../skds/api'

const api = new Api('closed')
const Order: React.FC = (props: any) => {
    const [order, setOrder] = useState({})
    const { id } = props
    TLoader.tLoader(1, 'Carregando pedido...')
    api.getOrder(id).then((data: any) => {

    })
    return (
        <div className={styles.order}>

        </div>
    )
}
export default Order