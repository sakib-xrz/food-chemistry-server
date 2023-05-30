import { Menu } from './menu.model'

const getAllMenuFromDatabase = async () => {
  const menu = await Menu.find()
  return menu
}

const getAllMenuCategoryFromDatabase = async () => {
  const categories = await Menu.distinct('category')
  return categories
}

const getMenuByCategoryFromDatabase = async (params: string) => {
  const menu = await Menu.find({ category: params })
  return menu
}

export default {
  getAllMenuFromDatabase,
  getAllMenuCategoryFromDatabase,
  getMenuByCategoryFromDatabase,
}
