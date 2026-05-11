export const eventBus = new EventTarget();

// New category
export const openNewCategoryModal = () => {
    eventBus.dispatchEvent(new CustomEvent('openNewCategoryModal'));
};

export const closeNewCategoryModal = () => {
    eventBus.dispatchEvent(new CustomEvent('closeNewCategoryModal'));
};

// Edit Category
export const openEditCategoryModal = (catId: number) => {
    eventBus.dispatchEvent(new CustomEvent('openEditCategoryModal', {
        detail: catId
    }));
}

export const closeEditCategoryModal = () => {
    eventBus.dispatchEvent(new CustomEvent('closeEditCategoryModal'));
};

// Edit Product
export const openEditProductModal = (catId: number, prodId: number) => {
    eventBus.dispatchEvent(new CustomEvent('openEditProductModal', {
        detail: {
            catId,
            prodId
        }
    }));
};

export const closeEditProductModal = () => {
    eventBus.dispatchEvent(new CustomEvent('closeEditProductModal'));
};
