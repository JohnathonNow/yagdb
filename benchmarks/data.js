window.BENCHMARK_DATA = {
  "lastUpdate": 1787203128196,
  "repoUrl": "https://github.com/JohnathonNow/yagdb",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "name": "JohnathonNow",
            "username": "JohnathonNow"
          },
          "committer": {
            "name": "JohnathonNow",
            "username": "JohnathonNow"
          },
          "id": "6e39d27723bfbd7d1d49bd9eca085e1271788205",
          "message": "ci: Add GitHub Action for benchmark suite",
          "timestamp": "2026-08-20T03:43:36Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/130/commits/6e39d27723bfbd7d1d49bd9eca085e1271788205"
        },
        "date": 1787203127743,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32779,
            "range": "± 150",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34008,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61396,
            "range": "± 2080",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45782,
            "range": "± 92",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 135482,
            "range": "± 1082",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108821,
            "range": "± 595",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132509,
            "range": "± 349",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 110150,
            "range": "± 578",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69985,
            "range": "± 464",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56267,
            "range": "± 109",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133237,
            "range": "± 3330",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 109839,
            "range": "± 807",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3087760805,
            "range": "± 18379230",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4463,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7819,
            "range": "± 20",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5500,
            "range": "± 61",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 9032,
            "range": "± 30",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8949,
            "range": "± 60",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15144,
            "range": "± 83",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 463181,
            "range": "± 7415",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 448481,
            "range": "± 7657",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 500922,
            "range": "± 10515",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 564416,
            "range": "± 20607",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 406103,
            "range": "± 2113",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}