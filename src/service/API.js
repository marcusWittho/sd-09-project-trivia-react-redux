const getCategories = async () => {
  const fetchCategories = await fetch('https://opentdb.com/api_category.php');
  const categories = await fetchCategories.json();
  return categories.trivia_categories;
};

export default getCategories;
