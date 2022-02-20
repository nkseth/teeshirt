import { Button } from 'primereact/button'
import React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { clearlastorder } from '../../redux/cart/cartActions'

const Thankyou=({history})=>{
const dispatch=useDispatch()
    useEffect(() => {
       
        return () => {
            dispatch(clearlastorder())
        }
    }, [])
const {t}=useTranslation()
return <div style={{width: '100%', minHeight: '40vh',marginTop:'20vh'
,display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column'
}}>
    <img src="https://img.icons8.com/fluency/96/000000/verified-account.png" alt='verified'/>
    <h6>{t("Thank You For Your Order")}</h6>

    <Button style={{marginTop:'20px'}}
    onClick={()=>{history.push('/myorder');
    dispatch(clearlastorder())
    }}>{t("Go to my Orders")}</Button>
</div>
}

export default withRouter(Thankyou)