import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const DashboardCard = ({ 
  title, 
  description, 
  children, 
  footerText, 
  onFooterClick, 
  className = "" 
}) => {
  return (
    <Card className={`hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-sm text-gray-600">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        {children}
        
        {footerText && (
          <div className="mt-4">
            <button 
              onClick={onFooterClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
            >
              {footerText}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
