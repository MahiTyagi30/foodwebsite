export const ADD=(item)=>{
    return {
        type:"ADD_CART",
        payload:item
    }
}

// remove iteams
export const DLT=(id)=>{
    return {
        type:"RMV_CART",
        payload:id
    }
}

// remove individual itm
export const REMOVE=(item)=>{
    return {
        type:"RMV_ONE",
        payload:item
    }
}


export const setSearchQuery = (query) => ({
    type: 'SET_SEARCH_QUERY',
    payload: query,
  });


  export const clearCart = () => {
    return {
      type: "CLEAR_CART",
    };
  };