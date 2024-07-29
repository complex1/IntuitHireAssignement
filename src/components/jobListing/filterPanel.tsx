import { useState } from 'react';
import { IFilter } from '../../types';
import CardComponent from '../common/card/card';
import InputComponent from '../common/input/input';
import SelectComponent from '../common/input/select';
import styled from './filterPanel.module.css';

interface FilterPanelProps {
  filter: IFilter;
  setFilter: (filter: IFilter) => void;
}

const FilterPanelComponent = (props: FilterPanelProps) => {
  const { filter, setFilter } = props;
  const [salaryOption, setSalaryOption] = useState('0-6');


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
        <SelectComponent label="Salary per annum" value={salaryOption} options={[
          { label: '0-6', value: '6LPA' },
          { label: '6-12', value: '6LPA-12LPA' },
          { label: '12-18', value: '12LPA-18LPA' },
          { label: '18-24', value: '18LPA-24LPA' },
          { label: '24-30', value: '24LPA-30LPA' },
          { label: '30+', value: '30+LPA' },
        ]} onChange={(e) => {
          setSalaryOption(e.target.value);
          if (e.target.value === '6LPA') {
            setFilter({ ...filter, salaryMin: 0, salaryMax: 6 });
          } else if (e.target.value === '6LPA-12LPA') {
            setFilter({ ...filter, salaryMin: 6, salaryMax: 12 });
          } else if (e.target.value === '12LPA-18LPA') {
            setFilter({ ...filter, salaryMin: 12, salaryMax: 18 });
          } else if (e.target.value === '18LPA-24LPA') {
            setFilter({ ...filter, salaryMin: 18, salaryMax: 24 });
          } else if (e.target.value === '24LPA-30LPA') {
            setFilter({ ...filter, salaryMin: 24, salaryMax: 30 });
          } else if (e.target.value === '30+LPA') {
            setFilter({ ...filter, salaryMin: 30, salaryMax: 40 });
          }
        }} />
        {filter.tagOptions?.length ? <><h3>
          Tags:
        </h3> <div className={styled.filterCheckboxContainer}> {
          filter.tagOptions.map((tag, index) => (
            <InputComponent
              key={tag + index}
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
        }</div></> : null}

        {
          filter.companysOptions?.length ? <><h3>
            Company:
          </h3>
          <div className={styled.filterCheckboxContainer}>
            {
              filter.companysOptions.map((company, index) => (
                <InputComponent
                  key={company + index}
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
            }</div></> : null
        }

      </CardComponent>
    </div>
  );
}

export default FilterPanelComponent;