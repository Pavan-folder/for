import SearchBar from '../SearchBar';

export default function SearchBarExample() {
  return (
    <div className="p-6 max-w-2xl">
      <SearchBar
        placeholder="Search clinical trials, publications, or experts..."
        onSearch={(query) => console.log('Search:', query)}
        onFilterClick={() => console.log('Filters clicked')}
      />
    </div>
  );
}
