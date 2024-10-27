import React from 'react';

const OpenPosition = ({
  openCDP,
}) => {
  return (
    <div className="border border-blue-100 rounded-lg p-6 bg-white">
      <>
      <div>set up Vault</div>
      <div className="pt-1">*This step need only once</div>
        <button
          onClick={openCDP}
          style={{ width: '100%', height: '50px' }}
          type="submit"
          className="mt-5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
          <span style={{ width: '30px', fontWeight: '700', fontSize: '15px' }}>
              Open Position
          </span>
        </button>
      </>
    </div>
  );
};

export default OpenPosition;