import { User } from '@/types';
import React from 'react'
import Card from './Card';
type CardGridProps = {
  users: User[];
}
function CardGrid({ users }: CardGridProps) {
  
  return (
    
      <div className="flex min-h-screen w-full items-center justify-center ">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <Card
              key={user.login.uuid}
              user={user}
            />
          ))}
        </div>

      </div>
    );
  };
  
  export default CardGrid;