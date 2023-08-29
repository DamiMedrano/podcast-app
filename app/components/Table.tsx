import { ReactNode } from 'react';

interface Props {
  headers: any[];
  children: ReactNode;
}

const Table: React.FC<Props> = ({ headers, children }) => {
  return (
    <table className='w-full'>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className='w-full'>{children}</tbody>
    </table>
  );
};

export default Table;