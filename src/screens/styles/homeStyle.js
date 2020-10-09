import { connect } from '../../themes/OsmiProvider'

export default connect({
    loading: 'flex bg-white items-center justify-center',
    container: 'flex bg-dark-100',
    header: 'bg-blue-500 row p-2',
    left: 'flex',
    salam: 'text-white mont-semi text-lg',
    nama: 'text-sm text-white mont-regular',
    right: 'items-end justify-end',
    saldoSaya: 'row',
    rp: 'text-sm mont-regular text-white',
    nominal: 'mont-semi text-white text-xl',
    headerMenu: 'row bg-blue-500 px-1 py-2',
    btnMenuHeader: 'flex mx-1 p-1 items-center',
    btnMenuHeaderLabel: 'text-white mont-semi mt-1',
    purchaseMenu: 'bg-white mx-2 rounded-lg px-1 py-2 my-5',
    purchaseMenu1: 'row mb-5',
    purchaseMenu2: 'row',
    btnPurchaseMenu: 'flex items-center',
    btnPurchaseMenuLabel: 'text-black mont-regular text-center mt-2 justify-center',
    promo: 'mx-2',
    promoText: 'mont-semi mb-2',
    promoImg: 'w-250 h-150 rounded-lg m-2'
})