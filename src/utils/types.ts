export interface IAddedIngredient {
   ingredient: IIngredient;
   id: string;
   moveCard: (dragIndex: number, hoverIndex: number) => void;
   index: number;
}

export interface IIngredient {
   calories: number;
   carbohydrates: number;
   fat: number;
   image: string;
   image_large: string;
   image_mobile: string;
   name: string;
   price: number;
   proteins: number;
   type: string;
   uuid: string;
   __v: string;
   _id: string;
}

export interface IBurgerConstructorProps {
   onDropHandler: (ingredientId: IIngredient) => void;
}

export interface IUserInfo {
   email: string;
   name: string;
}

export interface IUserData {
   accessToken: string;
   refreshToken: string;
   success: boolean;
   user: IUserInfo | null;
}

export interface LocationState {
   from: {
      pathname: string;
   };
   background: string;
}

export interface IIngredientProps {
   ingredient: IIngredient;
}

export interface IListIngredients {
   ingredients: IIngredient[];
   title: string;
   id: string;
}

export interface IModalProps {
   title?: string;
   children: React.ReactChild | React.ReactNode;
   onClick: () => void;
}

export interface IModalOverlayProps {
   onClick: () => void;
}

export interface ICreatedOrder {
   name: string;
   order: { number: number };
   success: boolean;
}

export interface IIndex {
   id: string;
   index: number;
}

export type TModifiedIngredient = {
   id: string;
   img: string;
   name: string;
   price: number;
   qty: number;
};

export type TOrder = {
   _id: string;
   status: string | "pending" | "done";
   name: string;
   createdAt: string;
   updatedAt: string;
   number: number;
   ingredients: string[];

   price?: number;
   modifiedIngredients?: TModifiedIngredient[];
};





