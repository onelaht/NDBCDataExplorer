# NDBCDataExplorer  
Interactive web dashboard for mapping, filtering, and charting National Data Buoy Center (NDBC) data    

##  Production Build  
 - `https://buoymap.onelaht.workers.dev/`  

## Development Build  

### Prerequisites  

#### Configure NodeJS (npm)  
- `https://nodejs.org/en/download/current`  

### Running client and server  

#### 1. Download project repo  
- `git clone https://github.com/onelaht/NDBCDataExplorer.git`  

#### 2. Install NPM dependencies  
- `cd NDBCDataExplorer && npm install`  

#### 3. Initialize schema  
- `wrangler d1 execute app_db --file = schema/ndbc_data.sql`  

#### 4. Run development build  
- `npm run dev`  
- Open `localhost:5173/` via browser  