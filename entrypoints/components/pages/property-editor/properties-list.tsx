import { Property } from '@/types/entry.interface';

export default function ({ properties }: { properties: Property[] }) {
  return (
    <>
      {properties.map((property) => (
        <div key={property.id} className="px-3 py-3">
          <div className="flex items-center gap-2">
            <span className="text-primary-on-container">{property.name}</span>
            <span className="text-primary-on-container">{property.type}</span>
            <span className="text-primary-on-container">{property.value}</span>
          </div>
        </div>
      ))}
    </>
  );
}
