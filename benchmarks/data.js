window.BENCHMARK_DATA = {
  "lastUpdate": 1787348711415,
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
      },
      {
        "commit": {
          "author": {
            "email": "Johnjwesthoff@gmail.com",
            "name": "John Westhoff",
            "username": "JohnathonNow"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7551ff54fcb81b99a7a988ba2473c051d7599be0",
          "message": "Merge pull request #130 from JohnathonNow/ci-add-benchmarks-workflow-13579803303356226728\n\nci: Add GitHub Action for benchmark suite",
          "timestamp": "2026-08-21T14:32:36-07:00",
          "tree_id": "1aec64e91fd5bf2bbd15e0da804aa304239d2c82",
          "url": "https://github.com/JohnathonNow/yagdb/commit/7551ff54fcb81b99a7a988ba2473c051d7599be0"
        },
        "date": 1787348710939,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33010,
            "range": "± 238",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34296,
            "range": "± 142",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62040,
            "range": "± 2333",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45938,
            "range": "± 171",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132664,
            "range": "± 446",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108457,
            "range": "± 343",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132672,
            "range": "± 247",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107693,
            "range": "± 228",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69805,
            "range": "± 507",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 57116,
            "range": "± 118",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133718,
            "range": "± 2991",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 109427,
            "range": "± 405",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3198909159,
            "range": "± 28629838",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4438,
            "range": "± 23",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7775,
            "range": "± 3896",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5558,
            "range": "± 1793",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8823,
            "range": "± 195",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8865,
            "range": "± 1571",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15247,
            "range": "± 150",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 464369,
            "range": "± 10903",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 450437,
            "range": "± 2803",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 501476,
            "range": "± 10168",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 572784,
            "range": "± 4640",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 409152,
            "range": "± 5289",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}