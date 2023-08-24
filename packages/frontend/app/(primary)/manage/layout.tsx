import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MockServerLayout = ({ children }: Props) => {
  return (
    <div className="flex gap-8">
      <div className="bg-gray-100 flex-[8] p-4 rounded min-h-[300px]">{children}</div>
    </div>
  );
};
export default MockServerLayout;
