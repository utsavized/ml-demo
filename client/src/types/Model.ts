import SortOrder from './SortOrder'
import Measure from './Measure'

interface Model {
    name: string,
    sortorder: SortOrder,
    data: Array<Measure> 
}

export default Model;