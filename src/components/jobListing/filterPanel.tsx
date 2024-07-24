import { IFilter } from '../../types';
import CardComponent from '../common/card/card';
import InputComponent from '../common/input/input';
import styled from './filterPanel.module.css';

interface FilterPanelProps {
  filter: IFilter;
  setFilter: (filter: IFilter) => void;
}

const FilterPanelComponent = (props: FilterPanelProps) => {
  const { filter, setFilter } = props;

  return (
    <div className={styled.jobFilter} >
    <CardComponent width="100%" >
      <h2>Filter</h2>
        <InputComponent
          type="text"
          label="Search"
          placeholder="Search"
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
        { filter.tagOptions?.length ? <h3>
          Tags:
        </h3> : null }
        {
          filter.tagOptions.map((tag) => (
            <InputComponent
              key={tag}
              type="checkbox"
              label={tag}
              onClick={() => {
                console.log('tag', tag);
                if (!filter.tags.includes(tag)) {
                  setFilter({ ...filter, tags: [...filter.tags, tag] });
                } else {
                  setFilter({ ...filter, tags: filter.tags.filter((t) => t !== tag) });
                }
              }}
            />
          ))
        }

        {
          filter.companysOptions?.length ? <h3>
            Company:
          </h3> : null
        }
        {
          filter.companysOptions.map((company) => (
            <InputComponent
              key={company}
              type="checkbox"
              label={company}
              onClick={() => {
                if (!filter.companys.includes(company)) {
                  setFilter({ ...filter, companys: [...filter.companys, company] });
                } else {
                  setFilter({ ...filter, companys: filter.companys.filter((c) => c !== company) });
                }
              }}
            />
          ))
        }

    </CardComponent>
    </div>
  );
}

export default FilterPanelComponent;