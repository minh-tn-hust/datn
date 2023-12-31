const axios = require("axios");


const NUMBER_OF_TEST = 200;
const RUN_CODE_URL = "http://localhost:8000/execution-service/runWithSaving";
const AUTHEN_URL = "http://localhost:8000/auth/api/auth/signin";

let ACCESS_TOKEN = null;

let AC_CPP_DATA = {
    "source" : "#include <iostream>\n#include <cstdio>\n#include <cstdlib>\n#include <algorithm>\n#include <cmath>\n#include <vector>\n#include <set>\n#include <map>\n#include <unordered_set>\n#include <unordered_map>\n#include <queue>\n#include <ctime>\n#include <cassert>\n#include <complex>\n#include <string>\n#include <cstring>\n#include <chrono>\n#include <random>\n#include <bitset>\n#include <array>\n#include <numeric>\n#include <iomanip>\n#include <climits>\n\nusing namespace std;\n\n// #include <atcoder/all>\n// using namespace atcoder;\n\ntypedef long long ll;\ntypedef vector<int> vi;\ntypedef vector<ll> vll;\ntypedef pair<int, int> pii;\ntypedef pair<long long, long long> pll;\n\n#define pb push_back\n#define N 100000\n#define all(x) (x).begin(), (x).end()\n#define inf 1000000007\n#define pi 3.141592653589793238462643383279502884197169399\n\nll ans = -1, cnt, h, w, t, dp[20][1<<20], dis[20][305][305];\npll start, finish;\nvector<pll> v;\nchar a[305][305];\nll dx[4] = {-1, 0, 1, 0};\nll dy[4] = {0, 1, 0, -1};\n\nvoid bfs(int in, int x, int y)\n{\n\tint vis[h][w];\t\n\tmemset(vis, 0, sizeof(vis));\n\tfor(int i = 0; i<h; i++) for(int j = 0; j<w; j++) dis[in][i][j] = 3e6;\n\tvis[x][y] = 1;\n\tdis[in][x][y] = 0;\n\tqueue<pii> q; q.push({x, y});\n\twhile(!q.empty())\n\t{\n\t\tauto p = q.front(); q.pop();\n\t\tfor(int i = 0; i<4; i++)\n\t\t{\n\t\t\tint b = p.first+dx[i], c = p.second+dy[i];\n\t\t\tif(0 <= b && b < h && 0 <= c && c < w) \n\t\t\t{\n\t\t\t\tif(!vis[b][c] && a[b][c] != 35)\n\t\t\t\t{\n\t\t\t\t\tvis[b][c] = 1;\n\t\t\t\t\tdis[in][b][c] = dis[in][p.first][p.second]+1;\n\t\t\t\t\tq.push({b, c});\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n\nint main()\n{\n    //freopen(\"input.txt\", \"r\", stdin);\n    //freopen(\"output.txt\", \"w\", stdout);\n    ios::sync_with_stdio(0);\n    cin.tie(0);\n\tcin >> h >> w >> t; \n\tfor(int i = 0; i<h; i++) for(int j = 0; j<w; j++) \n\t{\n\t\tcin >> a[i][j]; \n\t\tif(a[i][j] == 111) {cnt++; v.pb({i, j});}\t\n\t\tif(a[i][j] == 83) {start = {i, j};}\n\t\tif(a[i][j] == 71) {finish = {i, j};}\n\t}\n\tfor(int i = 0; i<cnt; i++) bfs(i, v[i].first, v[i].second);\t\n\tbfs(cnt, start.first, start.second);\n\tfor(int i = 0; i<cnt; i++) for(int j = 0; j<(1<<cnt); j++) dp[i][j] = 1e15;\n\tif(dis[cnt][finish.first][finish.second] <= t) ans = 0;\n\tfor(int i = 0; i<cnt; i++) dp[i][1<<i] = dis[cnt][v[i].first][v[i].second];\n\tfor(int i = 1; i<(1<<cnt); i++)\n\t{\n\t\tfor(int j = 0; j<cnt; j++)\n\t\t{\n\t\t\tif(i&(1<<j))\n\t\t\t{\n\t\t\t\tint left = (i^(1<<j));\n\t\t\t\tfor(int k = 0; k<cnt; k++)\t\t\t\n\t\t\t\t{\n\t\t\t\t\tif(left&(1<<k))\n\t\t\t\t\t{\n\t\t\t\t\t\tdp[j][i] = min(dp[j][i], dp[k][left]+dis[k][v[j].first][v[j].second]);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tif(dp[j][i] + dis[j][finish.first][finish.second] <= t) \n\t\t\t\t{\n\t\t\t\t\tans = max(ans, (ll)__builtin_popcount(i));\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\tcout << ans << endl;\n}\n",
    "problemId" : "13",
    "language" : "cpp",
    "timeLimited" : 2,
    "memoryLimited" : 128
} 

let AC_GO_DATA ={
    "source":"package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"io\"\n\t\"math\"\n\t\"math/bits\"\n\t\"os\"\n\t\"strconv\"\n)\n\nvar iost *Iost\n\ntype Iost struct {\n\tScanner *bufio.Scanner\n\tWriter  *bufio.Writer\n}\n\nfunc NewIost(fp io.Reader, wfp io.Writer) *Iost {\n\tconst BufSize = 2000005\n\tscanner := bufio.NewScanner(fp)\n\tscanner.Split(bufio.ScanWords)\n\tscanner.Buffer(make([]byte, BufSize), BufSize)\n\treturn &Iost{Scanner: scanner, Writer: bufio.NewWriter(wfp)}\n}\nfunc (i *Iost) Text() string {\n\tif !i.Scanner.Scan() {\n\t\tpanic(\"scan failed\")\n\t}\n\treturn i.Scanner.Text()\n}\nfunc (i *Iost) Atoi(s string) int                 { x, _ := strconv.Atoi(s); return x }\nfunc (i *Iost) GetNextInt() int                   { return i.Atoi(i.Text()) }\nfunc (i *Iost) Atoi64(s string) int64             { x, _ := strconv.ParseInt(s, 10, 64); return x }\nfunc (i *Iost) GetNextInt64() int64               { return i.Atoi64(i.Text()) }\nfunc (i *Iost) Atof64(s string) float64           { x, _ := strconv.ParseFloat(s, 64); return x }\nfunc (i *Iost) GetNextFloat64() float64           { return i.Atof64(i.Text()) }\nfunc (i *Iost) Print(x ...interface{})            { fmt.Fprint(i.Writer, x...) }\nfunc (i *Iost) Printf(s string, x ...interface{}) { fmt.Fprintf(i.Writer, s, x...) }\nfunc (i *Iost) Println(x ...interface{})          { fmt.Fprintln(i.Writer, x...) }\nfunc isLocal() bool                               { return os.Getenv(\"NICKEL\") == \"BACK\" }\nfunc main() {\n\tfp := os.Stdin\n\twfp := os.Stdout\n\tif isLocal() {\n\t\tfp, _ = os.Open(os.Getenv(\"WELL_EVERYBODY_LIES_TOO_MUCH\"))\n\t}\n\tiost = NewIost(fp, wfp)\n\tdefer func() {\n\t\tiost.Writer.Flush()\n\t}()\n\tsolve()\n}\n\nconst Inf = math.MaxInt64\n\nfunc solve() {\n\th := iost.GetNextInt()\n\tw := iost.GetNextInt()\n\tt := iost.GetNextInt()\n\taa := make([]string, h)\n\too := make([][2]int, 0)\n\tvar sy, sx, gy, gx int\n\tfor i := 0; i < h; i++ {\n\t\taa[i] = iost.Text()\n\t\tfor j := 0; j < w; j++ {\n\t\t\tif aa[i][j] == 111 {\n\t\t\t\too = append(oo, [2]int{i, j})\n\t\t\t}\n\t\t\tif aa[i][j] == 83 {\n\t\t\t\tsy = i\n\t\t\t\tsx = j\n\t\t\t}\n\t\t\tif aa[i][j] == 71 {\n\t\t\t\tgy = i\n\t\t\t\tgx = j\n\t\t\t}\n\t\t}\n\t}\n\tfroms := bfs(sy, sx, aa)\n\tfromg := bfs(gy, gx, aa)\n\to := len(oo)\n\tfromo := make([][][]int, o)\n\tfor i := 0; i < o; i++ {\n\t\tfromo[i] = bfs(oo[i][0], oo[i][1], aa)\n\t}\n\tdp := makeGrid(1<<uint(o), o)\n\tfor i := 0; i < 1<<uint(o); i++ {\n\t\tfor j := 0; j < o; j++ {\n\t\t\tdp[i][j] = Inf\n\t\t}\n\t}\n\tfor i := 0; i < o; i++ {\n\t\tdp[1<<uint(i)][i] = froms[oo[i][0]][oo[i][1]]\n\t}\n\tfor i := 0; i < 1<<uint(o); i++ {\n\t\tfor j := 0; j < o; j++ {\n\t\t\tif dp[i][j] == Inf {\n\t\t\t\tcontinue\n\t\t\t}\n\t\t\tfor to := 0; to < o; to++ {\n\t\t\t\tif i>>uint(to)&1 == 1 {\n\t\t\t\t\tcontinue\n\t\t\t\t}\n\t\t\t\tif fromo[j][oo[to][0]][oo[to][1]] == Inf {\n\t\t\t\t\tcontinue\n\t\t\t\t}\n\t\t\t\tdp[i|(1<<uint(to))][to] = min(dp[i|(1<<uint(to))][to], dp[i][j]+fromo[j][oo[to][0]][oo[to][1]])\n\t\t\t}\n\t\t}\n\t}\n\tans := -1\n\tif froms[gy][gx] <= t {\n\t\tans = 0\n\t}\n\tfor i := 0; i < 1<<uint(o); i++ {\n\t\tfor j := 0; j < o; j++ {\n\t\t\tif dp[i][j] == Inf {\n\t\t\t\tcontinue\n\t\t\t}\n\t\t\tif fromg[oo[j][0]][oo[j][1]] == Inf {\n\t\t\t\tcontinue\n\t\t\t}\n\t\t\tif dp[i][j]+fromg[oo[j][0]][oo[j][1]] > t {\n\t\t\t\tcontinue\n\t\t\t}\n\t\t\tans = max(ans, bits.OnesCount(uint(i)))\n\t\t}\n\t}\n\tiost.Println(ans)\n}\nfunc max(a, b int) int {\n\tif a < b {\n\t\treturn b\n\t}\n\treturn a\n}\nfunc min(a, b int) int { return -max(-a, -b) }\nfunc abs(a int) int    { return max(a, -a) }\n\nfunc bfs(y, x int, aa []string) [][]int {\n\th := len(aa)\n\tw := len(aa[0])\n\tg := makeGrid(h, w)\n\tfor i := 0; i < h; i++ {\n\t\tfor j := 0; j < w; j++ {\n\t\t\tg[i][j] = Inf\n\t\t}\n\t}\n\tg[y][x] = 0\n\tq := make([][2]int, 0)\n\tq = append(q, [2]int{y, x})\n\tdy := [4]int{-1, 1, 0, 0}\n\tdx := [4]int{0, 0, -1, 1}\n\tfor len(q) > 0 {\n\t\tp := q[0]\n\t\tq = q[1:]\n\t\tfor i := 0; i < 4; i++ {\n\t\t\tyy := p[0] + dy[i]\n\t\t\txx := p[1] + dx[i]\n\t\t\tif yy < 0 || yy >= h {\n\t\t\t\tcontinue\n\t\t\t}\n\t\t\tif xx < 0 || xx >= w {\n\t\t\t\tcontinue\n\t\t\t}\n\t\t\tif g[yy][xx] < Inf {\n\t\t\t\tcontinue\n\t\t\t}\n\t\t\tif aa[yy][xx] == 35 {\n\t\t\t\tcontinue\n\t\t\t}\n\t\t\tg[yy][xx] = g[p[0]][p[1]] + 1\n\t\t\tq = append(q, [2]int{yy, xx})\n\t\t}\n\t}\n\treturn g\n}\nfunc makeGrid(h, w int) [][]int {\n\tindex := make([][]int, h)\n\tdata := make([]int, h*w)\n\tfor i := 0; i < h; i++ {\n\t\tindex[i] = data[i*w : (i+1)*w]\n\t}\n\treturn index\n}\n",
    "problemId":"13",
    "language":"golang",
    "timeLimited" : 2,
    "memoryLimited" : 128
} 

let AC_JAVA_DATA = {
    "source":"import java.awt.*;\nimport java.util.*;\nimport java.util.function.Function;\n\nclass Main{\n\n    public static void main(String...args) {\n        Scanner sc = new Scanner(System.in);\n        final int H=sc.nextInt(),W=sc.nextInt(),T=sc.nextInt();\n        final char[][] map = new char[H][];\n        final int INF=100100100;\n\n        for(int i=0;i<H;i++){\n            map[i]=sc.next().toCharArray();\n        }\n        //お菓子の数\n        int N;\n        //ある地点からある地点へのコスト[遷移元][遷移先]\n        int[][] cost;\n        {\n            ArrayList<Point> points=new ArrayList<>();\n            Point start=null,goal=null;\n\n            for(int i=0;i<H;i++){\n                for(int j=0;j<W;j++){\n                    if(map[i][j]==111)points.add(new Point(j,i));\n                    else if(map[i][j]==83)start=new Point(j,i);\n                    else if(map[i][j]==71)goal=new Point(j,i);\n                }\n            }\n            N=points.size();\n            points.add(start);\n            points.add(goal);\n            final int size=points.size();\n            cost=new int[size][size];\n\n\n            Point[] move=new Point[]{\n                    new Point(1,0),\n                    new Point(0,1),\n                    new Point(-1,0),\n                    new Point(0,-1)\n            };\n            for(int i=0;i<size;i++) {\n                Point start1=points.get(i);\n\n                Queue<Point> queue = new ArrayDeque<>();\n                queue.add(start1);\n                final int[][] distance=new int[H][W];\n\n                for(int a=0;a<H;a++)Arrays.fill(distance[a],INF);\n                distance[start1.y][start1.x]=0;\n\n                while (!queue.isEmpty()) {\n                    Point point = queue.poll();\n\n                    for (int a=0;a<4;a++) {\n                        Point p = new Point(point.x + move[a].x, point.y + move[a].y);\n                        if (p.x<0||p.y<0||W<=p.x||H<= p.y) continue;\n\n                        if (map[p.y][p.x] == 35) continue;\n                        if (distance[p.y][p.x] == INF) {\n                            distance[p.y][p.x]=distance[point.y][point.x]+1;\n                            queue.add(p);\n                        }\n                    }\n                }\n                for(int j=0;j<size;j++){\n                    Point p=points.get(j);\n                    cost[i][j]=distance[p.y][p.x];\n                }\n            }\n        }\n        final int start=N,goal=N+1,N2=1<<N;\n        if(cost[start][goal]>T){\n            System.out.println(-1);\n            return;\n        }\n\n        //いったことがある頂点の集合、現在いる頂点\n        int[][] dp = new int[N2][N];\n        for(int i=0;i<N2;i++)Arrays.fill(dp[i],INF);\n\n        for(int i=0;i<N;i++){\n            dp[1<<i][i]=cost[start][i];\n        }\n\n        for(int i=0;i<N2;i++){\n            for(int j=0;j<N;j++){\n                if(dp[i][j]==INF)continue;\n\n                for(int a=0;a<N;a++){\n                    if(((~i)&(1<<a))==0)continue;\n                    final int q=i|(1<<a);\n                    dp[q][a]=Math.min(dp[q][a],dp[i][j]+cost[j][a]);\n                }\n            }\n        }\n        int ans=0;\n        Function<Integer,Integer> func=i->{\n            int a=0;\n            while(i!=0){\n                if(i%2==1)a++;\n                i=i>>>1;\n            }\n            return a;\n        };\n        for(int i=0;i<N2;i++){\n            for(int j=0;j<N;j++){\n                if(dp[i][j]+cost[j][goal]<=T){\n                    ans=Math.max(ans,func.apply(i));\n                }\n            }\n        }\n        System.out.println(ans);\n    }\n}\n",
    "problemId":"13",
    "language":"java",
    "timeLimited" : 2,
    "memoryLimited": 128
};

const createACTest = async function() {
    let headers = {
        "content-type" : "application/json",
        "x-access-token" : ACCESS_TOKEN,
    }
    try {
        let res = await axios.post(RUN_CODE_URL, AC_CPP_DATA, {
            headers : headers,
            timeout : 5 * 60 * 1000
        });
    } catch (error) {
        console.log(error.message);
    }

}

const getAccessToken = async function() {
    const data = {
        "username": "theOriginer",
        "password": "123123123"
    };
    
    let res = await axios.post(AUTHEN_URL, data);
    return res.data.accessToken;
};

const runTest = async function() {
    let promises = Array(NUMBER_OF_TEST).fill().map(() => createACTest());
    Promise.all(promises);
};

async function main() {
    ACCESS_TOKEN = await getAccessToken();
    runTest();
}

console.log(NUMBER_OF_TEST);
main();

