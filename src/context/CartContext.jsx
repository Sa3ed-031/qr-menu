import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const current = state[action.item.id];
      return {
        ...state,
        [action.item.id]: { item: action.item, qty: (current?.qty ?? 0) + 1 },
      };
    }
    case "remove": {
      const current = state[action.id];
      if (!current) return state;
      if (current.qty <= 1) {
        const next = { ...state };
        delete next[action.id];
        return next;
      }
      return { ...state, [action.id]: { ...current, qty: current.qty - 1 } };
    }
    case "clear":
      return {};
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {});

  const value = useMemo(() => {
    const lines = Object.values(state);
    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.qty, 0),
      total: lines.reduce((sum, l) => sum + l.qty * l.item.price, 0),
      qtyOf: (id) => state[id]?.qty ?? 0,
      add: (item) => dispatch({ type: "add", item }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
