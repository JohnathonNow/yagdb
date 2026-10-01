window.BENCHMARK_DATA = {
  "lastUpdate": 1790879018424,
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
          "id": "9c1fbd2a9dd9936e986d6484a1e8bda9a796b1fb",
          "message": "Merge pull request #132 from JohnathonNow/bolt-box-execution-step-3838375490167516419\n\n⚡ Bolt: Box large ExecutionStep variants to reduce enum size",
          "timestamp": "2026-08-21T14:33:54-07:00",
          "tree_id": "5f3b9fcf23889030af103c9709a1b55ff0b01073",
          "url": "https://github.com/JohnathonNow/yagdb/commit/9c1fbd2a9dd9936e986d6484a1e8bda9a796b1fb"
        },
        "date": 1787348756310,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32532,
            "range": "± 342",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34396,
            "range": "± 485",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62276,
            "range": "± 958",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 48363,
            "range": "± 311",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130856,
            "range": "± 526",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108487,
            "range": "± 1646",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130878,
            "range": "± 316",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107737,
            "range": "± 870",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67726,
            "range": "± 332",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56169,
            "range": "± 294",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131002,
            "range": "± 9636",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108028,
            "range": "± 1714",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2774477922,
            "range": "± 16782419",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3543,
            "range": "± 76",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6295,
            "range": "± 95",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5017,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 7988,
            "range": "± 106",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8478,
            "range": "± 191",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 13993,
            "range": "± 248",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 427596,
            "range": "± 5364",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 406984,
            "range": "± 9369",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 463146,
            "range": "± 9924",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 540162,
            "range": "± 5678",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 356450,
            "range": "± 4041",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "4cc85b3c3887bbc170a7b40ea39846dc81e812a9",
          "message": "⚡ Bolt: [feature improvement] Add id() function for retrieving node and edge identifiers",
          "timestamp": "2026-08-21T21:35:33Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/133/commits/4cc85b3c3887bbc170a7b40ea39846dc81e812a9"
        },
        "date": 1787349044345,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33086,
            "range": "± 368",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34198,
            "range": "± 112",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62732,
            "range": "± 1390",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46147,
            "range": "± 202",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132455,
            "range": "± 5883",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107272,
            "range": "± 1210",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133885,
            "range": "± 224",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 117931,
            "range": "± 1930",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69900,
            "range": "± 370",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56879,
            "range": "± 131",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 134609,
            "range": "± 221",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 110824,
            "range": "± 240",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3075147438,
            "range": "± 22848023",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4018,
            "range": "± 97",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7284,
            "range": "± 111",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5324,
            "range": "± 527",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8399,
            "range": "± 110",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8546,
            "range": "± 242",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14315,
            "range": "± 313",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 429423,
            "range": "± 17699",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 421488,
            "range": "± 1988",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 470156,
            "range": "± 2038",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 536986,
            "range": "± 1735",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 377688,
            "range": "± 2065",
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
          "id": "457359dc7b1b71dc1e0478d5c5c857ef6aa9cf6f",
          "message": "Merge pull request #133 from JohnathonNow/george/add-id-function-10263779521681525921\n\n⚡ Bolt: [feature improvement] Add id() function for retrieving node and edge identifiers",
          "timestamp": "2026-08-21T14:42:42-07:00",
          "tree_id": "a79fff812867d06be81206db285b7d5f5dcd46b6",
          "url": "https://github.com/JohnathonNow/yagdb/commit/457359dc7b1b71dc1e0478d5c5c857ef6aa9cf6f"
        },
        "date": 1787349340434,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33783,
            "range": "± 3968",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34738,
            "range": "± 444",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61511,
            "range": "± 1638",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45855,
            "range": "± 250",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132628,
            "range": "± 6786",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107708,
            "range": "± 213",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133626,
            "range": "± 1939",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108519,
            "range": "± 586",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69519,
            "range": "± 2721",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56162,
            "range": "± 2528",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133578,
            "range": "± 464",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107756,
            "range": "± 988",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3273743303,
            "range": "± 30111035",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4116,
            "range": "± 120",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7481,
            "range": "± 108",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5316,
            "range": "± 233",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8503,
            "range": "± 298",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8604,
            "range": "± 291",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14296,
            "range": "± 368",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 431734,
            "range": "± 6446",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 422835,
            "range": "± 3624",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 471411,
            "range": "± 6807",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 540959,
            "range": "± 2087",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 383720,
            "range": "± 5164",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "09f5d046c88d2eb224f67518908988adacd11ee3",
          "message": "⚡ George: Add DROP INDEX feature",
          "timestamp": "2026-08-21T21:42:47Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/134/commits/09f5d046c88d2eb224f67518908988adacd11ee3"
        },
        "date": 1787408185480,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 41116,
            "range": "± 1891",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 43320,
            "range": "± 1353",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61736,
            "range": "± 1471",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46498,
            "range": "± 97",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132713,
            "range": "± 282",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107276,
            "range": "± 213",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132692,
            "range": "± 485",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108028,
            "range": "± 6504",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 81846,
            "range": "± 451",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 62144,
            "range": "± 358",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132576,
            "range": "± 638",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108130,
            "range": "± 3205",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3194679905,
            "range": "± 23106047",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4047,
            "range": "± 92",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7391,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5359,
            "range": "± 408",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8455,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8744,
            "range": "± 250",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14244,
            "range": "± 342",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 450508,
            "range": "± 6553",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 434202,
            "range": "± 8064",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 487587,
            "range": "± 2384",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 562212,
            "range": "± 4439",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 394090,
            "range": "± 4575",
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
          "id": "51787d359f0394af018e1e946fed7bd3362599e1",
          "message": "Merge pull request #134 from JohnathonNow/feature/drop-index-9515285019068885359\n\n⚡ George: Add DROP INDEX feature",
          "timestamp": "2026-08-22T21:00:19-07:00",
          "tree_id": "85fc76bb4217bd7f29496cc667845f0e8a109129",
          "url": "https://github.com/JohnathonNow/yagdb/commit/51787d359f0394af018e1e946fed7bd3362599e1"
        },
        "date": 1787458279657,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 25551,
            "range": "± 230",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 26542,
            "range": "± 89",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 47718,
            "range": "± 373",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 34748,
            "range": "± 104",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 103412,
            "range": "± 707",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 87731,
            "range": "± 185",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 103615,
            "range": "± 749",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 87387,
            "range": "± 1123",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 53830,
            "range": "± 7304",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45616,
            "range": "± 1102",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 103959,
            "range": "± 241",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 86653,
            "range": "± 127",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2623242300,
            "range": "± 18384552",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3204,
            "range": "± 597",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 5792,
            "range": "± 219",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 4198,
            "range": "± 894",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 6713,
            "range": "± 256",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 6907,
            "range": "± 309",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 11397,
            "range": "± 5334",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 348569,
            "range": "± 4947",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 335579,
            "range": "± 2983",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 374978,
            "range": "± 5819",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 434399,
            "range": "± 1316",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 304253,
            "range": "± 2594",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "37cfe158a568a834b8c1598950a60ab6d02d7b72",
          "message": "⚡ George: [feature improvement] Add STARTS WITH, ENDS WITH, and CONTAINS string operators",
          "timestamp": "2026-08-23T04:01:07Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/135/commits/37cfe158a568a834b8c1598950a60ab6d02d7b72"
        },
        "date": 1787493813531,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33187,
            "range": "± 181",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34187,
            "range": "± 1490",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61802,
            "range": "± 1041",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46277,
            "range": "± 129",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132422,
            "range": "± 1494",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107595,
            "range": "± 784",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132823,
            "range": "± 310",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107314,
            "range": "± 370",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69994,
            "range": "± 1535",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 57064,
            "range": "± 299",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132715,
            "range": "± 2790",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107309,
            "range": "± 225",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3152315499,
            "range": "± 39398301",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4049,
            "range": "± 174",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7269,
            "range": "± 116",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5270,
            "range": "± 181",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8575,
            "range": "± 92",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8745,
            "range": "± 253",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14473,
            "range": "± 373",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 448933,
            "range": "± 7198",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 431922,
            "range": "± 9590",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 480039,
            "range": "± 2676",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 553535,
            "range": "± 2346",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 390068,
            "range": "± 3447",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "bcd754141411c0328b431e317967281908b79e1a",
          "message": "⚡ Bolt: [performance improvement] Optimize ResultSet Allocations in Execution Loops",
          "timestamp": "2026-08-23T04:01:07Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/136/commits/bcd754141411c0328b431e317967281908b79e1a"
        },
        "date": 1787508967787,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33003,
            "range": "± 1892",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34483,
            "range": "± 169",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61603,
            "range": "± 346",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45880,
            "range": "± 356",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132739,
            "range": "± 10753",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107382,
            "range": "± 2355",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133057,
            "range": "± 1034",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108234,
            "range": "± 2225",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69381,
            "range": "± 566",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56287,
            "range": "± 779",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 137997,
            "range": "± 2067",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 110055,
            "range": "± 522",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3198440613,
            "range": "± 22151598",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4040,
            "range": "± 86",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7336,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5386,
            "range": "± 440",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8558,
            "range": "± 106",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8745,
            "range": "± 238",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14354,
            "range": "± 368",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 457864,
            "range": "± 12085",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 444405,
            "range": "± 5149",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 494664,
            "range": "± 3552",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 567851,
            "range": "± 2410",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 405815,
            "range": "± 5024",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "6a3cf1ca26da2572227f17022a3eeccd837a82b7",
          "message": "⚡ George: Add String Matching Operators (STARTS WITH, ENDS WITH, CONTAINS)",
          "timestamp": "2026-08-23T04:01:07Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/137/commits/6a3cf1ca26da2572227f17022a3eeccd837a82b7"
        },
        "date": 1787581283782,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32657,
            "range": "± 72",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33932,
            "range": "± 194",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60694,
            "range": "± 549",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46451,
            "range": "± 654",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131152,
            "range": "± 453",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107231,
            "range": "± 1054",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130411,
            "range": "± 1555",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108364,
            "range": "± 308",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66968,
            "range": "± 318",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56152,
            "range": "± 368",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130428,
            "range": "± 773",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108428,
            "range": "± 401",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2850822908,
            "range": "± 12054088",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3512,
            "range": "± 81",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6264,
            "range": "± 98",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5083,
            "range": "± 123",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 7969,
            "range": "± 171",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8465,
            "range": "± 211",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 13925,
            "range": "± 288",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 433279,
            "range": "± 3041",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 407750,
            "range": "± 2039",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 465799,
            "range": "± 3204",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 545015,
            "range": "± 3512",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 358241,
            "range": "± 2332",
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
          "id": "5b04e16ec1779cfbf1f90fd1d6322301ae410abe",
          "message": "Merge pull request #136 from JohnathonNow/bolt-resultset-allocation-optimization-8386555461777872542\n\n⚡ Bolt: [performance improvement] Optimize ResultSet Allocations in Execution Loops",
          "timestamp": "2026-08-24T19:54:11-07:00",
          "tree_id": "0bdd08830517c3c522a6cd2aaf9e61488f9a3eb0",
          "url": "https://github.com/JohnathonNow/yagdb/commit/5b04e16ec1779cfbf1f90fd1d6322301ae410abe"
        },
        "date": 1787627178077,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32771,
            "range": "± 434",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33995,
            "range": "± 431",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60544,
            "range": "± 741",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46633,
            "range": "± 780",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131290,
            "range": "± 368",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107938,
            "range": "± 725",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132000,
            "range": "± 435",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108201,
            "range": "± 360",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66986,
            "range": "± 208",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56940,
            "range": "± 1744",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131400,
            "range": "± 852",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108643,
            "range": "± 196",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2826090818,
            "range": "± 30895670",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3653,
            "range": "± 119",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6442,
            "range": "± 118",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5304,
            "range": "± 128",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8284,
            "range": "± 88",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8642,
            "range": "± 183",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14428,
            "range": "± 304",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 438177,
            "range": "± 5035",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 414497,
            "range": "± 9020",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 471861,
            "range": "± 2265",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 551225,
            "range": "± 16934",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 363043,
            "range": "± 1864",
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
          "id": "7e7412693a3835e0a00f1c37c95e02c5a6b5202e",
          "message": "Merge pull request #135 from JohnathonNow/feature/string-operators-14965559682555245045\n\n⚡ George: [feature improvement] Add STARTS WITH, ENDS WITH, and CONTAINS string operators",
          "timestamp": "2026-08-24T19:54:00-07:00",
          "tree_id": "bf8e5ad87c1d8dbd5ad99758c5c3e0b7baa1a3e5",
          "url": "https://github.com/JohnathonNow/yagdb/commit/7e7412693a3835e0a00f1c37c95e02c5a6b5202e"
        },
        "date": 1787627184441,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33239,
            "range": "± 602",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33870,
            "range": "± 118",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62433,
            "range": "± 249",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47047,
            "range": "± 217",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132450,
            "range": "± 780",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107731,
            "range": "± 2223",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 134880,
            "range": "± 4366",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 111971,
            "range": "± 184",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69804,
            "range": "± 430",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56961,
            "range": "± 308",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133163,
            "range": "± 1222",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 110078,
            "range": "± 3985",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3064798702,
            "range": "± 23468117",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4024,
            "range": "± 85",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7247,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5259,
            "range": "± 164",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8449,
            "range": "± 124",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8667,
            "range": "± 388",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14323,
            "range": "± 332",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 443690,
            "range": "± 2117",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 431643,
            "range": "± 3603",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 480611,
            "range": "± 3515",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 558500,
            "range": "± 5248",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 389053,
            "range": "± 2716",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "42098f34928e36d5c5c693453b08e66b391f5e0a",
          "message": "⚡ Bolt: Optimize label lookup in graph execution",
          "timestamp": "2026-08-25T02:54:36Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/138/commits/42098f34928e36d5c5c693453b08e66b391f5e0a"
        },
        "date": 1787683805630,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33094,
            "range": "± 1629",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34061,
            "range": "± 137",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62285,
            "range": "± 774",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 48243,
            "range": "± 206",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133427,
            "range": "± 869",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108009,
            "range": "± 6346",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133322,
            "range": "± 540",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108553,
            "range": "± 233",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69721,
            "range": "± 1773",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56029,
            "range": "± 465",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133107,
            "range": "± 591",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107976,
            "range": "± 3211",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3095454081,
            "range": "± 32995357",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4064,
            "range": "± 106",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7320,
            "range": "± 117",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5296,
            "range": "± 235",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8486,
            "range": "± 131",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8793,
            "range": "± 264",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14514,
            "range": "± 396",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 451286,
            "range": "± 2601",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 429673,
            "range": "± 7241",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 484690,
            "range": "± 2692",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 557562,
            "range": "± 2127",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 390352,
            "range": "± 3114",
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
          "id": "e046ec84d9e476e708441297b05de59f09571531",
          "message": "Merge pull request #138 from JohnathonNow/bolt/optimize-label-lookup-172590833038864131\n\n⚡ Bolt: Optimize label lookup in graph execution",
          "timestamp": "2026-08-25T18:39:07-07:00",
          "tree_id": "7755275959cdce93f970d367a2fd883eff96316c",
          "url": "https://github.com/JohnathonNow/yagdb/commit/e046ec84d9e476e708441297b05de59f09571531"
        },
        "date": 1787709091316,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33570,
            "range": "± 898",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34372,
            "range": "± 1733",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61672,
            "range": "± 170",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46776,
            "range": "± 200",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133263,
            "range": "± 219",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107683,
            "range": "± 169",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133727,
            "range": "± 4015",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109066,
            "range": "± 1352",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70835,
            "range": "± 2338",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56920,
            "range": "± 124",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133434,
            "range": "± 233",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 109156,
            "range": "± 2244",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3093315060,
            "range": "± 26541036",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4076,
            "range": "± 97",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7358,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5321,
            "range": "± 184",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8485,
            "range": "± 137",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8681,
            "range": "± 271",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14417,
            "range": "± 357",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 449040,
            "range": "± 2470",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 435875,
            "range": "± 2368",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 487044,
            "range": "± 7474",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 559538,
            "range": "± 2825",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 395906,
            "range": "± 5668",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "b23eadbaa39b2928302a27122c287402382d90db",
          "message": "⚡ Bolt: Optimize label lookup in graph execution",
          "timestamp": "2026-08-25T02:54:36Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/138/commits/b23eadbaa39b2928302a27122c287402382d90db"
        },
        "date": 1787709093992,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33025,
            "range": "± 623",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33907,
            "range": "± 242",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61466,
            "range": "± 258",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46214,
            "range": "± 1021",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133056,
            "range": "± 4080",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108460,
            "range": "± 667",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133424,
            "range": "± 2770",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109325,
            "range": "± 1677",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69765,
            "range": "± 654",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56294,
            "range": "± 410",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133425,
            "range": "± 374",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 109168,
            "range": "± 265",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3156465206,
            "range": "± 24133385",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4110,
            "range": "± 303",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7357,
            "range": "± 288",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5323,
            "range": "± 216",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8476,
            "range": "± 328",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8668,
            "range": "± 304",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14304,
            "range": "± 311",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 452386,
            "range": "± 2120",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 438228,
            "range": "± 5350",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 494678,
            "range": "± 7508",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 573593,
            "range": "± 1937",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 395376,
            "range": "± 2274",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "15694812684d743b4321b673c14b5d7fdd75f462",
          "message": "⚡ Bolt: Optimize grouping aggregations with key_buf reuse",
          "timestamp": "2026-08-26T01:39:20Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/140/commits/15694812684d743b4321b673c14b5d7fdd75f462"
        },
        "date": 1787855524033,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32920,
            "range": "± 316",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34518,
            "range": "± 117",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 63360,
            "range": "± 1620",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47274,
            "range": "± 229",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130750,
            "range": "± 5614",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109411,
            "range": "± 684",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131149,
            "range": "± 6428",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108428,
            "range": "± 1112",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67086,
            "range": "± 260",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56620,
            "range": "± 259",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 134258,
            "range": "± 3033",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108209,
            "range": "± 1509",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2789896932,
            "range": "± 31497253",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3611,
            "range": "± 130",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6506,
            "range": "± 157",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5174,
            "range": "± 226",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8130,
            "range": "± 142",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8630,
            "range": "± 270",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14301,
            "range": "± 456",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 431135,
            "range": "± 20795",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 411807,
            "range": "± 9990",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 469305,
            "range": "± 3797",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 546534,
            "range": "± 3315",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 364300,
            "range": "± 3615",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "a86a35d1a0b81b502edf17e9b922a39ff4372915",
          "message": "⚡ Bolt: Optimize memory allocation in aggregation grouping loop",
          "timestamp": "2026-08-26T01:39:20Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/141/commits/a86a35d1a0b81b502edf17e9b922a39ff4372915"
        },
        "date": 1787941054415,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33593,
            "range": "± 673",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34894,
            "range": "± 394",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61018,
            "range": "± 386",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45837,
            "range": "± 204",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132532,
            "range": "± 1024",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108216,
            "range": "± 691",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133929,
            "range": "± 1989",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108199,
            "range": "± 522",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67194,
            "range": "± 940",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56059,
            "range": "± 107",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132658,
            "range": "± 4325",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 110027,
            "range": "± 303",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2762261817,
            "range": "± 21796524",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3568,
            "range": "± 74",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6351,
            "range": "± 101",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5073,
            "range": "± 130",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8032,
            "range": "± 94",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8512,
            "range": "± 187",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14097,
            "range": "± 321",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 429879,
            "range": "± 4237",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 408845,
            "range": "± 6632",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 466342,
            "range": "± 2375",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 543449,
            "range": "± 3282",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 359067,
            "range": "± 3644",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "84de45167c02834e2bbf45872b9aeaa6b27fc862",
          "message": "⚡ Bolt: [Optimize aggregation grouping allocation]",
          "timestamp": "2026-08-26T01:39:20Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/142/commits/84de45167c02834e2bbf45872b9aeaa6b27fc862"
        },
        "date": 1788028170801,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 18531,
            "range": "± 206",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 19232,
            "range": "± 1035",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 34600,
            "range": "± 1881",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 26607,
            "range": "± 58",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 77515,
            "range": "± 3297",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 63029,
            "range": "± 3005",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 77661,
            "range": "± 815",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 66650,
            "range": "± 4783",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 40056,
            "range": "± 169",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 32315,
            "range": "± 1261",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 78161,
            "range": "± 3247",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 62968,
            "range": "± 2473",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2202270668,
            "range": "± 28596004",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2270,
            "range": "± 81",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 4147,
            "range": "± 312",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 3443,
            "range": "± 112",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 5146,
            "range": "± 69",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 5736,
            "range": "± 171",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 9592,
            "range": "± 279",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 241667,
            "range": "± 8254",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 244525,
            "range": "± 14874",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 281720,
            "range": "± 1868",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 331198,
            "range": "± 15318",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 216544,
            "range": "± 1352",
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
          "id": "3dc1332d32933da834086439391504a48a758b35",
          "message": "Merge pull request #142 from JohnathonNow/bolt-perf-aggregation-13591507010514877683\n\n⚡ Bolt: [Optimize aggregation grouping allocation]",
          "timestamp": "2026-08-29T11:44:42-07:00",
          "tree_id": "ea5606a71f204d0b974380fba30a7103d6d427f8",
          "url": "https://github.com/JohnathonNow/yagdb/commit/3dc1332d32933da834086439391504a48a758b35"
        },
        "date": 1788029801544,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33337,
            "range": "± 154",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 35214,
            "range": "± 112",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60947,
            "range": "± 767",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46316,
            "range": "± 202",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131665,
            "range": "± 1084",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107869,
            "range": "± 2918",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130767,
            "range": "± 1988",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107904,
            "range": "± 786",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67601,
            "range": "± 8476",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56427,
            "range": "± 314",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132876,
            "range": "± 3636",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 110926,
            "range": "± 748",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2803048956,
            "range": "± 16009333",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3602,
            "range": "± 84",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6388,
            "range": "± 102",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5124,
            "range": "± 143",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8118,
            "range": "± 120",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8548,
            "range": "± 198",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14201,
            "range": "± 294",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 437133,
            "range": "± 25432",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 415607,
            "range": "± 2670",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 472298,
            "range": "± 22223",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 551304,
            "range": "± 2671",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 371373,
            "range": "± 2739",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "4aa21170bf13fc0bd4e985c05bebcc886971ccc8",
          "message": "⚡ George: Add support for updating edge properties with SET",
          "timestamp": "2026-08-29T18:44:47Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/143/commits/4aa21170bf13fc0bd4e985c05bebcc886971ccc8"
        },
        "date": 1788186042871,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33479,
            "range": "± 116",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34671,
            "range": "± 233",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60669,
            "range": "± 1325",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47314,
            "range": "± 3800",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130927,
            "range": "± 1460",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 111344,
            "range": "± 1122",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132183,
            "range": "± 5583",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108160,
            "range": "± 883",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67741,
            "range": "± 1508",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56446,
            "range": "± 198",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130783,
            "range": "± 685",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108474,
            "range": "± 1729",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2775799785,
            "range": "± 33822879",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3580,
            "range": "± 209",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6453,
            "range": "± 135",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5389,
            "range": "± 148",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8459,
            "range": "± 129",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8783,
            "range": "± 226",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14509,
            "range": "± 366",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 438203,
            "range": "± 5176",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 416309,
            "range": "± 2268",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 475596,
            "range": "± 2096",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 556687,
            "range": "± 13473",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 365148,
            "range": "± 6599",
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
          "id": "1486aecd3559a13a561c6e4252bb41e39a55d048",
          "message": "Merge pull request #143 from JohnathonNow/george/add-set-edge-property-12731896127900064602\n\n⚡ George: Add support for updating edge properties with SET",
          "timestamp": "2026-09-01T04:20:46-07:00",
          "tree_id": "e00f029ff53fbb5174a265eb23d897270f84fdb5",
          "url": "https://github.com/JohnathonNow/yagdb/commit/1486aecd3559a13a561c6e4252bb41e39a55d048"
        },
        "date": 1788262301270,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 23799,
            "range": "± 837",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 25036,
            "range": "± 670",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 42858,
            "range": "± 908",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 31811,
            "range": "± 958",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 99002,
            "range": "± 2352",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 80209,
            "range": "± 1313",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 99534,
            "range": "± 1691",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 79817,
            "range": "± 1209",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 50508,
            "range": "± 2052",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 41924,
            "range": "± 1585",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 99065,
            "range": "± 3314",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 81095,
            "range": "± 2906",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2329207174,
            "range": "± 24538622",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2662,
            "range": "± 119",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 5005,
            "range": "± 493",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 4326,
            "range": "± 168",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 6311,
            "range": "± 165",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 7006,
            "range": "± 251",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 11892,
            "range": "± 337",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 296050,
            "range": "± 17092",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 301207,
            "range": "± 11406",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 343455,
            "range": "± 8901",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 405372,
            "range": "± 18360",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 262356,
            "range": "± 4341",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "9264a83a7a49a791a932d4306ff3efe724a5846e",
          "message": "⚡ George: Add support for updating edge properties with SET",
          "timestamp": "2026-08-29T18:44:47Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/143/commits/9264a83a7a49a791a932d4306ff3efe724a5846e"
        },
        "date": 1788262368737,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33530,
            "range": "± 107",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 35146,
            "range": "± 252",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60858,
            "range": "± 1556",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46738,
            "range": "± 202",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130674,
            "range": "± 682",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107992,
            "range": "± 547",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131561,
            "range": "± 591",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109169,
            "range": "± 5791",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69928,
            "range": "± 3743",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 59844,
            "range": "± 229",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131654,
            "range": "± 561",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107757,
            "range": "± 595",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2800119544,
            "range": "± 20503850",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3589,
            "range": "± 112",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6415,
            "range": "± 174",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5267,
            "range": "± 153",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8354,
            "range": "± 111",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8646,
            "range": "± 238",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14225,
            "range": "± 363",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 429530,
            "range": "± 3899",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 408127,
            "range": "± 4389",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 464859,
            "range": "± 2153",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 546542,
            "range": "± 2316",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 357812,
            "range": "± 2781",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "1d498e2eb4f115fc83aa243cd93b5ca8161d347d",
          "message": "⚡ George: [IN Operator Support]",
          "timestamp": "2026-09-01T11:22:15Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/144/commits/1d498e2eb4f115fc83aa243cd93b5ca8161d347d"
        },
        "date": 1788262890522,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 18208,
            "range": "± 335",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 19487,
            "range": "± 778",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 33657,
            "range": "± 1530",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 26389,
            "range": "± 973",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 79304,
            "range": "± 2400",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 63009,
            "range": "± 2596",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 77648,
            "range": "± 3725",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 63219,
            "range": "± 2478",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 40110,
            "range": "± 2254",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 32705,
            "range": "± 1220",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 77627,
            "range": "± 1878",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 63262,
            "range": "± 2249",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2235982918,
            "range": "± 27533292",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2209,
            "range": "± 79",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 4060,
            "range": "± 166",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 3454,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 5109,
            "range": "± 173",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 5774,
            "range": "± 242",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 9823,
            "range": "± 863",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 239309,
            "range": "± 7516",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 246191,
            "range": "± 21620",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 280841,
            "range": "± 10745",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 327500,
            "range": "± 14599",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 216904,
            "range": "± 14272",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "c78d9c1f4319e0b3a8d857d528cd3badcee46def",
          "message": "⚡ Bolt: optimize ResultSet bindings allocation in projection iterators",
          "timestamp": "2026-09-01T11:22:15Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/145/commits/c78d9c1f4319e0b3a8d857d528cd3badcee46def"
        },
        "date": 1788263512201,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33920,
            "range": "± 1792",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 35303,
            "range": "± 194",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61586,
            "range": "± 2641",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45947,
            "range": "± 3614",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130661,
            "range": "± 891",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108416,
            "range": "± 2274",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132005,
            "range": "± 5574",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108199,
            "range": "± 1053",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67910,
            "range": "± 177",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56139,
            "range": "± 2608",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131853,
            "range": "± 466",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 109363,
            "range": "± 1532",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2913121183,
            "range": "± 34251442",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3636,
            "range": "± 97",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6450,
            "range": "± 149",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5276,
            "range": "± 230",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8275,
            "range": "± 198",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8728,
            "range": "± 329",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14308,
            "range": "± 425",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 435175,
            "range": "± 3038",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 413785,
            "range": "± 3140",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 473299,
            "range": "± 11735",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 551377,
            "range": "± 4897",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 361765,
            "range": "± 8690",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "5f794cc690c28ede6f53654fe7457ae2a502aece",
          "message": "⚡ Bolt: Optimize memory allocations in query execution",
          "timestamp": "2026-09-01T11:22:15Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/146/commits/5f794cc690c28ede6f53654fe7457ae2a502aece"
        },
        "date": 1788287529895,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32835,
            "range": "± 270",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 35831,
            "range": "± 563",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60647,
            "range": "± 330",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46657,
            "range": "± 595",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132093,
            "range": "± 611",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108073,
            "range": "± 214",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131547,
            "range": "± 365",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107634,
            "range": "± 489",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67565,
            "range": "± 3324",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55970,
            "range": "± 150",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130917,
            "range": "± 19460",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108201,
            "range": "± 555",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2876249513,
            "range": "± 13186442",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3599,
            "range": "± 82",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6500,
            "range": "± 141",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5172,
            "range": "± 129",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8127,
            "range": "± 99",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8650,
            "range": "± 223",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14212,
            "range": "± 349",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 436059,
            "range": "± 2575",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 418447,
            "range": "± 2432",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 476542,
            "range": "± 3325",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 555775,
            "range": "± 2508",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 368478,
            "range": "± 2928",
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
          "id": "9d53db64044d176e1400b6dbc82b3022a0586286",
          "message": "Merge pull request #146 from JohnathonNow/bolt-bindings-optimization-13423297632787427478\n\n⚡ Bolt: Optimize memory allocations in query execution",
          "timestamp": "2026-09-01T12:11:42-07:00",
          "tree_id": "35c8f6631b24c5f04bf872f2422ca191cc128a26",
          "url": "https://github.com/JohnathonNow/yagdb/commit/9d53db64044d176e1400b6dbc82b3022a0586286"
        },
        "date": 1788290647842,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32461,
            "range": "± 95",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34479,
            "range": "± 498",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61866,
            "range": "± 933",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46546,
            "range": "± 196",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130682,
            "range": "± 225",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108550,
            "range": "± 211",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130987,
            "range": "± 1628",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108446,
            "range": "± 682",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67889,
            "range": "± 253",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55746,
            "range": "± 229",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132132,
            "range": "± 495",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108181,
            "range": "± 531",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2859678756,
            "range": "± 29234262",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3597,
            "range": "± 79",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6511,
            "range": "± 102",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5218,
            "range": "± 161",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8238,
            "range": "± 115",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8570,
            "range": "± 223",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14257,
            "range": "± 260",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 434024,
            "range": "± 5719",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 414677,
            "range": "± 4130",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 474042,
            "range": "± 1878",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 561247,
            "range": "± 2163",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 364153,
            "range": "± 3021",
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
          "id": "0e6877df4565d806856c0a2dde3ce56e4f5603fb",
          "message": "Merge pull request #144 from JohnathonNow/feature-in-operator-7666652681086863239\n\n⚡ George: [IN Operator Support]",
          "timestamp": "2026-09-01T12:12:17-07:00",
          "tree_id": "f3958ff0acdf72c7c74ed50ce93a74391578e60b",
          "url": "https://github.com/JohnathonNow/yagdb/commit/0e6877df4565d806856c0a2dde3ce56e4f5603fb"
        },
        "date": 1788290693881,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33744,
            "range": "± 93",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33834,
            "range": "± 119",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61574,
            "range": "± 859",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45786,
            "range": "± 97",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133309,
            "range": "± 1270",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107784,
            "range": "± 506",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133301,
            "range": "± 2203",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107840,
            "range": "± 486",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70558,
            "range": "± 165",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56740,
            "range": "± 4159",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132639,
            "range": "± 2212",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108815,
            "range": "± 267",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3147321165,
            "range": "± 16082516",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3995,
            "range": "± 92",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7286,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5280,
            "range": "± 164",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8410,
            "range": "± 119",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8589,
            "range": "± 239",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14363,
            "range": "± 403",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 444043,
            "range": "± 1937",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 431382,
            "range": "± 13512",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 484769,
            "range": "± 2561",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 551625,
            "range": "± 1970",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 394479,
            "range": "± 2070",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "b3451ba0735a83de895a1e59e5d0e1b966795ae7",
          "message": "⚡ Bolt: Replace repeated array allocations and string formats in `ExecutionStep::Unwind`",
          "timestamp": "2026-09-01T19:16:36Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/147/commits/b3451ba0735a83de895a1e59e5d0e1b966795ae7"
        },
        "date": 1788383131586,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33845,
            "range": "± 190",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34649,
            "range": "± 133",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60807,
            "range": "± 696",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47282,
            "range": "± 165",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131292,
            "range": "± 1761",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107810,
            "range": "± 1868",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130970,
            "range": "± 465",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108038,
            "range": "± 830",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66936,
            "range": "± 270",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56375,
            "range": "± 1872",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131018,
            "range": "± 3329",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107893,
            "range": "± 2677",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2803355167,
            "range": "± 20452576",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3590,
            "range": "± 87",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6409,
            "range": "± 104",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5140,
            "range": "± 138",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8131,
            "range": "± 100",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8626,
            "range": "± 203",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14164,
            "range": "± 581",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 432183,
            "range": "± 3997",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 410219,
            "range": "± 4374",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 467652,
            "range": "± 5644",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 546800,
            "range": "± 7581",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 358832,
            "range": "± 10239",
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
          "id": "d6b685d7702b8ac21cb8520a84f788cdbef187c2",
          "message": "Merge pull request #147 from JohnathonNow/jules-5640617238535737651-22c11e89\n\n⚡ Bolt: Replace repeated array allocations and string formats in `ExecutionStep::Unwind`",
          "timestamp": "2026-09-02T16:40:57-07:00",
          "tree_id": "b7579bc492618ee812ff09fea2b836ab2dfc4461",
          "url": "https://github.com/JohnathonNow/yagdb/commit/d6b685d7702b8ac21cb8520a84f788cdbef187c2"
        },
        "date": 1788393172805,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32655,
            "range": "± 572",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33996,
            "range": "± 252",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61141,
            "range": "± 3782",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47116,
            "range": "± 314",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130746,
            "range": "± 370",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107951,
            "range": "± 590",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131014,
            "range": "± 6267",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107768,
            "range": "± 571",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66922,
            "range": "± 596",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56062,
            "range": "± 222",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130801,
            "range": "± 2831",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107978,
            "range": "± 608",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2788758689,
            "range": "± 57711470",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3588,
            "range": "± 542",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6401,
            "range": "± 146",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5146,
            "range": "± 541",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8202,
            "range": "± 231",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8573,
            "range": "± 3421",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14235,
            "range": "± 348",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 424224,
            "range": "± 8891",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 406876,
            "range": "± 5078",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 462895,
            "range": "± 2456",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 538541,
            "range": "± 3517",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 358158,
            "range": "± 2799",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "b866a7b618b9a64c8a239eba43ba3be58dc04a73",
          "message": "⚡ George: [feature improvement] Implemented Cypher CALL subqueries",
          "timestamp": "2026-09-02T23:41:02Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/148/commits/b866a7b618b9a64c8a239eba43ba3be58dc04a73"
        },
        "date": 1788410869367,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33089,
            "range": "± 256",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34083,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60560,
            "range": "± 1118",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47099,
            "range": "± 352",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131123,
            "range": "± 697",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108202,
            "range": "± 1338",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132787,
            "range": "± 6429",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108807,
            "range": "± 1559",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66979,
            "range": "± 403",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56870,
            "range": "± 636",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131179,
            "range": "± 1010",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107111,
            "range": "± 1638",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2820047809,
            "range": "± 24428740",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3663,
            "range": "± 89",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6448,
            "range": "± 92",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5362,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8412,
            "range": "± 146",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9125,
            "range": "± 203",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14771,
            "range": "± 313",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 447511,
            "range": "± 2685",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 424997,
            "range": "± 7042",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 491883,
            "range": "± 2873",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 586675,
            "range": "± 7590",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 368199,
            "range": "± 4469",
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
          "id": "2da9515db185bde2be37a74953bd48b6e6aa942f",
          "message": "Merge pull request #148 from JohnathonNow/feature/call-subquery-9785696354697481575\n\n⚡ George: [feature improvement] Implemented Cypher CALL subqueries",
          "timestamp": "2026-09-02T21:37:53-07:00",
          "tree_id": "4b57b04a34dcf7b99de513d977272c81bc3fc9bf",
          "url": "https://github.com/JohnathonNow/yagdb/commit/2da9515db185bde2be37a74953bd48b6e6aa942f"
        },
        "date": 1788411000278,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32674,
            "range": "± 126",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34531,
            "range": "± 1573",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61355,
            "range": "± 614",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47631,
            "range": "± 302",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131419,
            "range": "± 2395",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108738,
            "range": "± 953",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 134961,
            "range": "± 1685",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109508,
            "range": "± 896",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67283,
            "range": "± 1162",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56326,
            "range": "± 275",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132059,
            "range": "± 2466",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108046,
            "range": "± 933",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2830512975,
            "range": "± 21315605",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3643,
            "range": "± 94",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6429,
            "range": "± 183",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5447,
            "range": "± 120",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8432,
            "range": "± 113",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9020,
            "range": "± 224",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14779,
            "range": "± 344",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 452601,
            "range": "± 3861",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 426848,
            "range": "± 6966",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 493744,
            "range": "± 5928",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 589961,
            "range": "± 2628",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 369717,
            "range": "± 2817",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "f1cb5d8e4a61c177f43499f62b65d93fe1b9f901",
          "message": "⚡ Bolt: [performance improvement] Hoist string formatting out of hot loop in Unwind execution",
          "timestamp": "2026-09-03T04:38:04Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/149/commits/f1cb5d8e4a61c177f43499f62b65d93fe1b9f901"
        },
        "date": 1788459349779,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32488,
            "range": "± 465",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34056,
            "range": "± 443",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61354,
            "range": "± 3936",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47494,
            "range": "± 269",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130449,
            "range": "± 1429",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107951,
            "range": "± 1181",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 142929,
            "range": "± 2417",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107607,
            "range": "± 275",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67164,
            "range": "± 1260",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56535,
            "range": "± 478",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130932,
            "range": "± 1221",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107422,
            "range": "± 361",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2882775852,
            "range": "± 52705646",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3656,
            "range": "± 199",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6406,
            "range": "± 103",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5360,
            "range": "± 235",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8422,
            "range": "± 153",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8922,
            "range": "± 236",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14613,
            "range": "± 301",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 458190,
            "range": "± 6579",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 429719,
            "range": "± 4716",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 496248,
            "range": "± 4073",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 592063,
            "range": "± 3469",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 372012,
            "range": "± 16705",
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
          "id": "2d83ee8653b0781281d22ffcdd91a15debfbdb0d",
          "message": "Merge pull request #149 from JohnathonNow/bolt-optim-unwind-format-1702725053319714039\n\n⚡ Bolt: [performance improvement] Hoist string formatting out of hot loop in Unwind execution",
          "timestamp": "2026-09-03T19:54:33-07:00",
          "tree_id": "54a580b990ccd1703e649751170fcca8864886a5",
          "url": "https://github.com/JohnathonNow/yagdb/commit/2d83ee8653b0781281d22ffcdd91a15debfbdb0d"
        },
        "date": 1788491194401,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32619,
            "range": "± 186",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34488,
            "range": "± 297",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61181,
            "range": "± 260",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46072,
            "range": "± 507",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130798,
            "range": "± 969",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107031,
            "range": "± 1016",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131062,
            "range": "± 401",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107740,
            "range": "± 869",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67417,
            "range": "± 224",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55952,
            "range": "± 180",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131555,
            "range": "± 1117",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107196,
            "range": "± 294",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2787704096,
            "range": "± 21536654",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3548,
            "range": "± 81",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6242,
            "range": "± 131",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5341,
            "range": "± 119",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8293,
            "range": "± 138",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8870,
            "range": "± 207",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14465,
            "range": "± 304",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 459651,
            "range": "± 8873",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 435217,
            "range": "± 2268",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 502610,
            "range": "± 2514",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 597460,
            "range": "± 17773",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 375843,
            "range": "± 2489",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "8ea52688663730a99c00770f8fa7b80166433238",
          "message": "⚡ Bolt: [performance improvement] Hoist string formatting out of hot loop in Unwind execution",
          "timestamp": "2026-09-03T04:38:04Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/149/commits/8ea52688663730a99c00770f8fa7b80166433238"
        },
        "date": 1788491230280,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32922,
            "range": "± 329",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34165,
            "range": "± 250",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61676,
            "range": "± 1188",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45887,
            "range": "± 150",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133839,
            "range": "± 921",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108748,
            "range": "± 412",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133906,
            "range": "± 722",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108652,
            "range": "± 191",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70185,
            "range": "± 224",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56826,
            "range": "± 189",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133511,
            "range": "± 1364",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108717,
            "range": "± 352",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3155259348,
            "range": "± 34477422",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4073,
            "range": "± 94",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7340,
            "range": "± 117",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5511,
            "range": "± 144",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8639,
            "range": "± 99",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9131,
            "range": "± 254",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15017,
            "range": "± 334",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 459418,
            "range": "± 3264",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 446097,
            "range": "± 2062",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 508251,
            "range": "± 2766",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 595712,
            "range": "± 7032",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 397934,
            "range": "± 2498",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "108781b7828eefb197dd10bee831c68ca328e3c9",
          "message": "⚡ Bolt: Support scalar fallback & direct expressions in `UNWIND`",
          "timestamp": "2026-09-04T02:54:40Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/150/commits/108781b7828eefb197dd10bee831c68ca328e3c9"
        },
        "date": 1788491577669,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 22129,
            "range": "± 299",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 23012,
            "range": "± 588",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 42090,
            "range": "± 589",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 31984,
            "range": "± 520",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 93443,
            "range": "± 2083",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 77052,
            "range": "± 1187",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 93571,
            "range": "± 2018",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 77363,
            "range": "± 1134",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 49399,
            "range": "± 959",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 40828,
            "range": "± 957",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 92847,
            "range": "± 729",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 77287,
            "range": "± 1002",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2267796747,
            "range": "± 14133353",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2604,
            "range": "± 57",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 4951,
            "range": "± 130",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 4329,
            "range": "± 157",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 6343,
            "range": "± 129",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 7373,
            "range": "± 213",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 12311,
            "range": "± 282",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 309985,
            "range": "± 4069",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 316432,
            "range": "± 2811",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 371852,
            "range": "± 13437",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 453840,
            "range": "± 5341",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 271599,
            "range": "± 2454",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "585a5711f0240d2a63b8a31a80263fb5074650c6",
          "message": "⚡ Bolt: [performance improvement] Precompute projection keys outside hot loops",
          "timestamp": "2026-09-04T02:54:40Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/151/commits/585a5711f0240d2a63b8a31a80263fb5074650c6"
        },
        "date": 1788718932672,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33996,
            "range": "± 172",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34655,
            "range": "± 146",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62630,
            "range": "± 1760",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45921,
            "range": "± 218",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131005,
            "range": "± 1655",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107463,
            "range": "± 488",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130165,
            "range": "± 508",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107395,
            "range": "± 528",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67011,
            "range": "± 230",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 58927,
            "range": "± 174",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130165,
            "range": "± 392",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108230,
            "range": "± 1196",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2966861445,
            "range": "± 28578375",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3673,
            "range": "± 147",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6474,
            "range": "± 140",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5533,
            "range": "± 242",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8530,
            "range": "± 160",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9210,
            "range": "± 383",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14930,
            "range": "± 521",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 463538,
            "range": "± 2806",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 437480,
            "range": "± 6332",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 508756,
            "range": "± 9163",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 605314,
            "range": "± 4288",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 382070,
            "range": "± 2420",
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
          "id": "7ea2a6dd6f5af71b9d1cee1fb42062309f0feea3",
          "message": "Merge pull request #151 from JohnathonNow/bolt-opt-projection-keys-10761134918596952231\n\n⚡ Bolt: [performance improvement] Precompute projection keys outside hot loops",
          "timestamp": "2026-09-07T02:32:50-04:00",
          "tree_id": "ceda12b909fa43e0239619f99066365802be840c",
          "url": "https://github.com/JohnathonNow/yagdb/commit/7ea2a6dd6f5af71b9d1cee1fb42062309f0feea3"
        },
        "date": 1788763407981,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 21556,
            "range": "± 778",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 23077,
            "range": "± 204",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 41021,
            "range": "± 574",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 31283,
            "range": "± 131",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 93334,
            "range": "± 3583",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 75955,
            "range": "± 2820",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 93494,
            "range": "± 9467",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 76151,
            "range": "± 1297",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 49260,
            "range": "± 2704",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 41869,
            "range": "± 848",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 93339,
            "range": "± 649",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 76088,
            "range": "± 1389",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2241623299,
            "range": "± 19544298",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2568,
            "range": "± 179",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 4964,
            "range": "± 267",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 4270,
            "range": "± 242",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 6290,
            "range": "± 118",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 7230,
            "range": "± 497",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 12104,
            "range": "± 320",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 311112,
            "range": "± 2394",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 316571,
            "range": "± 7176",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 372139,
            "range": "± 6691",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 454798,
            "range": "± 23061",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 273309,
            "range": "± 18545",
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
          "id": "a5e12e9862fe511811a2b0f81445cd5823bf643c",
          "message": "Merge pull request #150 from JohnathonNow/fix-unwind-scalars-5445724111772132523\n\n⚡ Bolt: Support scalar fallback & direct expressions in `UNWIND`",
          "timestamp": "2026-09-07T02:33:55-04:00",
          "tree_id": "bbce1e42cffea1aa670f3b2a8e8cb90a5dbc40df",
          "url": "https://github.com/JohnathonNow/yagdb/commit/a5e12e9862fe511811a2b0f81445cd5823bf643c"
        },
        "date": 1788763570688,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32425,
            "range": "± 329",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34485,
            "range": "± 1202",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62276,
            "range": "± 2635",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47280,
            "range": "± 217",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130341,
            "range": "± 1176",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108296,
            "range": "± 420",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130177,
            "range": "± 656",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107556,
            "range": "± 386",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66837,
            "range": "± 295",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 59479,
            "range": "± 116",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130060,
            "range": "± 1030",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107411,
            "range": "± 2562",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2827014303,
            "range": "± 31799195",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3613,
            "range": "± 83",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6327,
            "range": "± 105",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5371,
            "range": "± 119",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8396,
            "range": "± 164",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8918,
            "range": "± 230",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14714,
            "range": "± 303",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 459970,
            "range": "± 9160",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 431078,
            "range": "± 12157",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 500405,
            "range": "± 4246",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 600195,
            "range": "± 4608",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 373087,
            "range": "± 3410",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "348aed43bd103c5ff6db5ee2817be72158cc6791",
          "message": "⚡ Bolt: Support scalar fallback & direct expressions in `UNWIND`",
          "timestamp": "2026-09-07T06:32:55Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/150/commits/348aed43bd103c5ff6db5ee2817be72158cc6791"
        },
        "date": 1788763618042,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 31356,
            "range": "± 938",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 32548,
            "range": "± 649",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 57936,
            "range": "± 1979",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 41536,
            "range": "± 1193",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 127778,
            "range": "± 3648",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 105701,
            "range": "± 2829",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 124603,
            "range": "± 2897",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 103682,
            "range": "± 3408",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 63976,
            "range": "± 1494",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 52835,
            "range": "± 1010",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 127902,
            "range": "± 2444",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106915,
            "range": "± 2361",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3563450629,
            "range": "± 71990208",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3759,
            "range": "± 123",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6773,
            "range": "± 200",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5158,
            "range": "± 182",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8097,
            "range": "± 128",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8463,
            "range": "± 308",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 13983,
            "range": "± 482",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 429832,
            "range": "± 6451",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 419688,
            "range": "± 6367",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 483240,
            "range": "± 7640",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 560954,
            "range": "± 7564",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 374426,
            "range": "± 6893",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "10121daa4349847b73b968296c63947762ffa799",
          "message": "⚡ George: Add EXPLAIN keyword to output query plans",
          "timestamp": "2026-09-07T06:34:00Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/152/commits/10121daa4349847b73b968296c63947762ffa799"
        },
        "date": 1788763996382,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32903,
            "range": "± 170",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33979,
            "range": "± 224",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62667,
            "range": "± 550",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46480,
            "range": "± 133",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133396,
            "range": "± 2086",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107946,
            "range": "± 264",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133195,
            "range": "± 431",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108178,
            "range": "± 417",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70958,
            "range": "± 180",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56330,
            "range": "± 465",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 134088,
            "range": "± 383",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 109645,
            "range": "± 392",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3091453530,
            "range": "± 14685794",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4070,
            "range": "± 96",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7391,
            "range": "± 108",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5441,
            "range": "± 1615",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8727,
            "range": "± 109",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9042,
            "range": "± 235",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14922,
            "range": "± 290",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 473682,
            "range": "± 2941",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 452160,
            "range": "± 4481",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 518320,
            "range": "± 4489",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 607025,
            "range": "± 3546",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 408393,
            "range": "± 9499",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "ef17c1874bfde6344f54f1e09e85786a22d2c800",
          "message": "⚡ Bolt: [performance improvement] Precompute destination keys in Unwind",
          "timestamp": "2026-09-07T06:34:00Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/153/commits/ef17c1874bfde6344f54f1e09e85786a22d2c800"
        },
        "date": 1788804389869,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32502,
            "range": "± 133",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34386,
            "range": "± 180",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62174,
            "range": "± 1243",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47431,
            "range": "± 270",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130400,
            "range": "± 250",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108048,
            "range": "± 641",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130172,
            "range": "± 313",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107629,
            "range": "± 254",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67729,
            "range": "± 328",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 57254,
            "range": "± 552",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130981,
            "range": "± 3468",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108718,
            "range": "± 666",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2832426720,
            "range": "± 27855697",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3542,
            "range": "± 81",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6337,
            "range": "± 110",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5309,
            "range": "± 133",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8201,
            "range": "± 142",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8950,
            "range": "± 210",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14718,
            "range": "± 363",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 453730,
            "range": "± 12952",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 428252,
            "range": "± 5624",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 497600,
            "range": "± 4141",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 590748,
            "range": "± 3907",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 371075,
            "range": "± 2282",
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
          "id": "a50dc57dd263728b3c602dc593fbd283928b30ec",
          "message": "Merge pull request #152 from JohnathonNow/george-explain-feature-2766369660767095168\n\n⚡ George: Add EXPLAIN keyword to output query plans",
          "timestamp": "2026-09-07T15:07:57-04:00",
          "tree_id": "e7fcd639a05931237ab12f8dd4673276822c76ff",
          "url": "https://github.com/JohnathonNow/yagdb/commit/a50dc57dd263728b3c602dc593fbd283928b30ec"
        },
        "date": 1788808702036,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 18124,
            "range": "± 66",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 19829,
            "range": "± 670",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 36310,
            "range": "± 201",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 27207,
            "range": "± 755",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 73857,
            "range": "± 1858",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 60949,
            "range": "± 328",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 73960,
            "range": "± 1996",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 61295,
            "range": "± 3025",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 41310,
            "range": "± 857",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 33563,
            "range": "± 1041",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 73799,
            "range": "± 1283",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 61324,
            "range": "± 1376",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2300080627,
            "range": "± 24623837",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2231,
            "range": "± 109",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 4150,
            "range": "± 161",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 3575,
            "range": "± 195",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 5246,
            "range": "± 152",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 6021,
            "range": "± 183",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 10226,
            "range": "± 498",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 259790,
            "range": "± 1647",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 262747,
            "range": "± 5198",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 310458,
            "range": "± 9247",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 379960,
            "range": "± 16208",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 225122,
            "range": "± 2265",
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
          "id": "1369313afbaadc714db527fc7f1859abcf141347",
          "message": "Merge pull request #153 from JohnathonNow/perf-unwind-precompute-10297576665523751214\n\n⚡ Bolt: [performance improvement] Precompute destination keys in Unwind",
          "timestamp": "2026-09-07T15:08:09-04:00",
          "tree_id": "27cf40d1fa861b1a8bb05adf0674427762f27104",
          "url": "https://github.com/JohnathonNow/yagdb/commit/1369313afbaadc714db527fc7f1859abcf141347"
        },
        "date": 1788808755243,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 25834,
            "range": "± 75",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 26427,
            "range": "± 63",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 47976,
            "range": "± 293",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 34976,
            "range": "± 446",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104764,
            "range": "± 715",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 87965,
            "range": "± 251",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104766,
            "range": "± 247",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 89105,
            "range": "± 254",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 53962,
            "range": "± 192",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 44490,
            "range": "± 97",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104887,
            "range": "± 254",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 88333,
            "range": "± 2795",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2673077146,
            "range": "± 18011524",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3135,
            "range": "± 60",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 5653,
            "range": "± 72",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 4274,
            "range": "± 104",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 6710,
            "range": "± 93",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 7049,
            "range": "± 198",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 11736,
            "range": "± 250",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 366071,
            "range": "± 3931",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 351488,
            "range": "± 2009",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 399739,
            "range": "± 2459",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 466439,
            "range": "± 3115",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 314471,
            "range": "± 5739",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "7c914c0b417a62954a8f810ffa190f164cc601fb",
          "message": "⚡ George: [feature improvement] add structured logging and tracing",
          "timestamp": "2026-09-07T19:08:57Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/154/commits/7c914c0b417a62954a8f810ffa190f164cc601fb"
        },
        "date": 1788877034712,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 28207,
            "range": "± 83",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 30760,
            "range": "± 449",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 53823,
            "range": "± 618",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46535,
            "range": "± 364",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 117584,
            "range": "± 456",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 98304,
            "range": "± 519",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 117296,
            "range": "± 1962",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 99361,
            "range": "± 294",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61231,
            "range": "± 1218",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 52393,
            "range": "± 130",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 117995,
            "range": "± 1466",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 97141,
            "range": "± 413",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2250385503,
            "range": "± 30467123",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3024,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 5735,
            "range": "± 111",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5327,
            "range": "± 191",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 7590,
            "range": "± 137",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8848,
            "range": "± 312",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14383,
            "range": "± 372",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 402355,
            "range": "± 2841",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 381982,
            "range": "± 2294",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 454137,
            "range": "± 9291",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 564935,
            "range": "± 4180",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 325550,
            "range": "± 2518",
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
          "id": "6e661b653b5e01b876fb834b6b51920bb028aa4a",
          "message": "Merge pull request #154 from JohnathonNow/feature/observability-6980146122117990567\n\n⚡ George: [feature improvement] add structured logging and tracing",
          "timestamp": "2026-09-08T13:18:29-04:00",
          "tree_id": "332e33b3493ff60a567736cb3e3e001efe5779a3",
          "url": "https://github.com/JohnathonNow/yagdb/commit/6e661b653b5e01b876fb834b6b51920bb028aa4a"
        },
        "date": 1788888644180,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32424,
            "range": "± 92",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34172,
            "range": "± 145",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61094,
            "range": "± 846",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47384,
            "range": "± 434",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130358,
            "range": "± 402",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107560,
            "range": "± 1165",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130343,
            "range": "± 363",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108529,
            "range": "± 436",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67978,
            "range": "± 279",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56698,
            "range": "± 105",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131071,
            "range": "± 1024",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108063,
            "range": "± 385",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2790993920,
            "range": "± 20969380",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3636,
            "range": "± 79",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6425,
            "range": "± 94",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5517,
            "range": "± 141",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8506,
            "range": "± 101",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9099,
            "range": "± 199",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15027,
            "range": "± 296",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 470426,
            "range": "± 5418",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 437832,
            "range": "± 2931",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 511031,
            "range": "± 2860",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 611107,
            "range": "± 3065",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 378820,
            "range": "± 2794",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "b2cc2ca2fa4d1d92fe9e3a8d9a3f7133a2227974",
          "message": "⚡ Bolt: [performance improvement] Optimize ExecutionStep::Call by reusing ResultSet allocations",
          "timestamp": "2026-09-08T17:21:09Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/155/commits/b2cc2ca2fa4d1d92fe9e3a8d9a3f7133a2227974"
        },
        "date": 1788891390985,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 21848,
            "range": "± 668",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 22351,
            "range": "± 346",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 42020,
            "range": "± 1104",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 30903,
            "range": "± 462",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 96468,
            "range": "± 2929",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 80163,
            "range": "± 784",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 97606,
            "range": "± 1358",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 80794,
            "range": "± 1000",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 52671,
            "range": "± 1124",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 43810,
            "range": "± 724",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 96118,
            "range": "± 1237",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 80909,
            "range": "± 1493",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2223960652,
            "range": "± 16797099",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2635,
            "range": "± 81",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 4981,
            "range": "± 108",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 4355,
            "range": "± 174",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 6407,
            "range": "± 222",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 7275,
            "range": "± 267",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 12126,
            "range": "± 350",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 314317,
            "range": "± 8969",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 319625,
            "range": "± 4812",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 377652,
            "range": "± 5792",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 460077,
            "range": "± 9268",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 274277,
            "range": "± 13078",
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
          "id": "d48ada999409237cdef7c8b89c9bd59619c66905",
          "message": "Merge pull request #155 from JohnathonNow/bolt-perf-reuse-resultset-7570772982704469430\n\n⚡ Bolt: [performance improvement] Optimize ExecutionStep::Call by reusing ResultSet allocations",
          "timestamp": "2026-09-08T23:21:36-04:00",
          "tree_id": "d0097cdf6b1a51b2686baca776b8743efc277d06",
          "url": "https://github.com/JohnathonNow/yagdb/commit/d48ada999409237cdef7c8b89c9bd59619c66905"
        },
        "date": 1788924826200,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32326,
            "range": "± 247",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34608,
            "range": "± 244",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61473,
            "range": "± 940",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46535,
            "range": "± 296",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129743,
            "range": "± 4664",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107876,
            "range": "± 446",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129944,
            "range": "± 1904",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107687,
            "range": "± 218",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 68175,
            "range": "± 173",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 57544,
            "range": "± 260",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130280,
            "range": "± 4331",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107285,
            "range": "± 802",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2758935174,
            "range": "± 15345590",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3714,
            "range": "± 118",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6446,
            "range": "± 97",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5441,
            "range": "± 136",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8489,
            "range": "± 107",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9040,
            "range": "± 212",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14878,
            "range": "± 244",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 474625,
            "range": "± 31461",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 440505,
            "range": "± 1413",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 511952,
            "range": "± 4150",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 614097,
            "range": "± 3312",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 381257,
            "range": "± 2678",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "009de48f35ef37b6b6e0c3653b0d303bb21ee64a",
          "message": "⚡ George: add http compression",
          "timestamp": "2026-09-09T03:21:46Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/156/commits/009de48f35ef37b6b6e0c3653b0d303bb21ee64a"
        },
        "date": 1789011305104,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32792,
            "range": "± 199",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34789,
            "range": "± 67",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60718,
            "range": "± 1223",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46597,
            "range": "± 211",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130144,
            "range": "± 1141",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107530,
            "range": "± 490",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130014,
            "range": "± 2382",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107882,
            "range": "± 399",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67897,
            "range": "± 280",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56968,
            "range": "± 219",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130618,
            "range": "± 3160",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107629,
            "range": "± 437",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2802127976,
            "range": "± 23932996",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3700,
            "range": "± 101",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6564,
            "range": "± 109",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5489,
            "range": "± 284",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8612,
            "range": "± 109",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9002,
            "range": "± 236",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14835,
            "range": "± 273",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 464518,
            "range": "± 5215",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 444754,
            "range": "± 2043",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 513289,
            "range": "± 8377",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 608138,
            "range": "± 4179",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 383933,
            "range": "± 3286",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "b3f38260e44bbc7f12073a31435b9d453a363e40",
          "message": "Add HTTP Basic Authentication",
          "timestamp": "2026-09-09T03:21:46Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/157/commits/b3f38260e44bbc7f12073a31435b9d453a363e40"
        },
        "date": 1789015347925,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32250,
            "range": "± 89",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34825,
            "range": "± 1059",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61254,
            "range": "± 715",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46280,
            "range": "± 172",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129850,
            "range": "± 1768",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109131,
            "range": "± 902",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130039,
            "range": "± 425",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107043,
            "range": "± 929",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67190,
            "range": "± 1063",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55842,
            "range": "± 2973",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130156,
            "range": "± 3293",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107164,
            "range": "± 692",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2809923443,
            "range": "± 24543648",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3679,
            "range": "± 80",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6418,
            "range": "± 95",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5423,
            "range": "± 121",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8562,
            "range": "± 99",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9099,
            "range": "± 214",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14772,
            "range": "± 295",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 465896,
            "range": "± 7702",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 439509,
            "range": "± 2493",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 509481,
            "range": "± 15261",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 603092,
            "range": "± 7628",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 378739,
            "range": "± 2360",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "4018c6bef35bb802547d6bc55b9d912dafda90ae",
          "message": "⚡ George: [feature improvement]",
          "timestamp": "2026-09-09T03:21:46Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/158/commits/4018c6bef35bb802547d6bc55b9d912dafda90ae"
        },
        "date": 1789050652463,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32638,
            "range": "± 251",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34607,
            "range": "± 207",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61049,
            "range": "± 1527",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47271,
            "range": "± 357",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130052,
            "range": "± 2453",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107150,
            "range": "± 474",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130235,
            "range": "± 722",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108535,
            "range": "± 1412",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 76816,
            "range": "± 1552",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 57005,
            "range": "± 164",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130183,
            "range": "± 1624",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108294,
            "range": "± 449",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3001269022,
            "range": "± 64378546",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3754,
            "range": "± 86",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6619,
            "range": "± 126",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5559,
            "range": "± 128",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8830,
            "range": "± 132",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9321,
            "range": "± 228",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15318,
            "range": "± 370",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 468813,
            "range": "± 3627",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 437462,
            "range": "± 5960",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 511194,
            "range": "± 4572",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 608955,
            "range": "± 5447",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 383471,
            "range": "± 4215",
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
          "id": "d25e18677a92db5efeefe9a1080d5f522a86f2b9",
          "message": "Merge pull request #157 from JohnathonNow/feature/basic-auth-1379475576404403794\n\nAdd HTTP Basic Authentication",
          "timestamp": "2026-09-10T23:34:53-04:00",
          "tree_id": "3f0ea4ce9843f755c0e1d422435dd3154eaef802",
          "url": "https://github.com/JohnathonNow/yagdb/commit/d25e18677a92db5efeefe9a1080d5f522a86f2b9"
        },
        "date": 1789098453564,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32981,
            "range": "± 1020",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33781,
            "range": "± 145",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61814,
            "range": "± 2937",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46237,
            "range": "± 127",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132971,
            "range": "± 3658",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 110492,
            "range": "± 1005",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133638,
            "range": "± 683",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 110990,
            "range": "± 265",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70336,
            "range": "± 765",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55859,
            "range": "± 1783",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133741,
            "range": "± 586",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108663,
            "range": "± 212",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3180133585,
            "range": "± 22794945",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4125,
            "range": "± 91",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7390,
            "range": "± 113",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5502,
            "range": "± 158",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8782,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9135,
            "range": "± 277",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15097,
            "range": "± 344",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 469711,
            "range": "± 3264",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 454190,
            "range": "± 1991",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 521664,
            "range": "± 3237",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 606679,
            "range": "± 3663",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 406774,
            "range": "± 2832",
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
          "id": "5754485ce050e43f41ad3e25c50be694b61c3f11",
          "message": "Merge pull request #156 from JohnathonNow/george-add-compression-4152683648279192912\n\n⚡ George: add http compression",
          "timestamp": "2026-09-10T23:36:43-04:00",
          "tree_id": "13af5b771161d527618745694358aa16c5ce0ec5",
          "url": "https://github.com/JohnathonNow/yagdb/commit/5754485ce050e43f41ad3e25c50be694b61c3f11"
        },
        "date": 1789098502679,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32338,
            "range": "± 127",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 30392,
            "range": "± 74",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 48400,
            "range": "± 1294",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 34838,
            "range": "± 616",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104502,
            "range": "± 284",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 88273,
            "range": "± 1142",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104331,
            "range": "± 1405",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 87879,
            "range": "± 345",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 53616,
            "range": "± 96",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 44287,
            "range": "± 59",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 106282,
            "range": "± 285",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 88031,
            "range": "± 536",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2673465037,
            "range": "± 33161611",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3280,
            "range": "± 71",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 5809,
            "range": "± 74",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 4388,
            "range": "± 182",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 6903,
            "range": "± 80",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 7072,
            "range": "± 210",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 11730,
            "range": "± 376",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 372180,
            "range": "± 2318",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 356061,
            "range": "± 6129",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 406073,
            "range": "± 2189",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 481711,
            "range": "± 13830",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 316654,
            "range": "± 2351",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "78b89297283636b704b809eba68dd2c721fe7321",
          "message": "⚡ George: add http compression",
          "timestamp": "2026-09-11T03:34:58Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/156/commits/78b89297283636b704b809eba68dd2c721fe7321"
        },
        "date": 1789098538703,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32592,
            "range": "± 118",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34455,
            "range": "± 663",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62190,
            "range": "± 182",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46948,
            "range": "± 235",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130397,
            "range": "± 442",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106891,
            "range": "± 1345",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129697,
            "range": "± 614",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107260,
            "range": "± 524",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67414,
            "range": "± 1320",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56977,
            "range": "± 381",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130116,
            "range": "± 310",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107449,
            "range": "± 260",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2726907457,
            "range": "± 15379060",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3561,
            "range": "± 80",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6341,
            "range": "± 101",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5321,
            "range": "± 131",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8302,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8895,
            "range": "± 195",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14641,
            "range": "± 277",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 462293,
            "range": "± 19757",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 436552,
            "range": "± 21294",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 506341,
            "range": "± 3061",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 601585,
            "range": "± 3422",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 378577,
            "range": "± 2112",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "c5d7219a68ed092a0b3fa5dbe0a73d469e8175ad",
          "message": "Refactor authentication to use Bearer token",
          "timestamp": "2026-09-11T03:36:48Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/159/commits/c5d7219a68ed092a0b3fa5dbe0a73d469e8175ad"
        },
        "date": 1789099158055,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32519,
            "range": "± 910",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34954,
            "range": "± 204",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60764,
            "range": "± 1188",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45963,
            "range": "± 277",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130552,
            "range": "± 335",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108465,
            "range": "± 513",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129979,
            "range": "± 349",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108386,
            "range": "± 325",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67781,
            "range": "± 625",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56910,
            "range": "± 226",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129964,
            "range": "± 13554",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 110249,
            "range": "± 501",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2769773348,
            "range": "± 14766331",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3769,
            "range": "± 106",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6641,
            "range": "± 116",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5558,
            "range": "± 137",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8589,
            "range": "± 96",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9078,
            "range": "± 186",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14990,
            "range": "± 276",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 475253,
            "range": "± 1577",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 443057,
            "range": "± 4840",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 515419,
            "range": "± 5649",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 610358,
            "range": "± 3383",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 385851,
            "range": "± 4015",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "7e92c125bf5bc5cace82108d1c1651d875f50843",
          "message": "Refactor authentication to use Bearer token",
          "timestamp": "2026-09-11T03:36:48Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/159/commits/7e92c125bf5bc5cace82108d1c1651d875f50843"
        },
        "date": 1789136929969,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 25402,
            "range": "± 279",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 26555,
            "range": "± 46",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 48698,
            "range": "± 259",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 38361,
            "range": "± 1031",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104474,
            "range": "± 1690",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 88259,
            "range": "± 202",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 105154,
            "range": "± 862",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 87947,
            "range": "± 141",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 53904,
            "range": "± 247",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 44278,
            "range": "± 87",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104284,
            "range": "± 1071",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 88586,
            "range": "± 1057",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2682786424,
            "range": "± 35228385",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3286,
            "range": "± 70",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 5798,
            "range": "± 121",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 4299,
            "range": "± 118",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 6895,
            "range": "± 72",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 7004,
            "range": "± 207",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 11670,
            "range": "± 253",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 360571,
            "range": "± 23839",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 351927,
            "range": "± 2431",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 398694,
            "range": "± 2474",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 469235,
            "range": "± 39971",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 315750,
            "range": "± 2342",
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
          "id": "7b6575a12444ee1d1bf9073e6abfa008ece8c533",
          "message": "Merge pull request #159 from JohnathonNow/update-auth-to-token-13207093595087118511\n\nRefactor authentication to use Bearer token",
          "timestamp": "2026-09-11T19:15:26-04:00",
          "tree_id": "de4de62900574585d11be13c44b0a15e77d03f35",
          "url": "https://github.com/JohnathonNow/yagdb/commit/7b6575a12444ee1d1bf9073e6abfa008ece8c533"
        },
        "date": 1789169283053,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32385,
            "range": "± 214",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34527,
            "range": "± 222",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62336,
            "range": "± 1197",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46443,
            "range": "± 1174",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131111,
            "range": "± 5000",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 125496,
            "range": "± 272",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130052,
            "range": "± 5275",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107649,
            "range": "± 505",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66823,
            "range": "± 1352",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56403,
            "range": "± 584",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129986,
            "range": "± 3704",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107713,
            "range": "± 1540",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2829246590,
            "range": "± 24231423",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3755,
            "range": "± 87",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6567,
            "range": "± 101",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5599,
            "range": "± 133",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8720,
            "range": "± 234",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9160,
            "range": "± 280",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15116,
            "range": "± 479",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 468509,
            "range": "± 5897",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 441190,
            "range": "± 3483",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 514244,
            "range": "± 3636",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 605997,
            "range": "± 9026",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 384296,
            "range": "± 3894",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "0a7f264c22bf01af14c2592b007567ac7aa55d46",
          "message": "⚡ George: Add `sqrt`, `power`, and `coalesce` functions",
          "timestamp": "2026-09-11T23:15:31Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/160/commits/0a7f264c22bf01af14c2592b007567ac7aa55d46"
        },
        "date": 1789169703134,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 26447,
            "range": "± 149",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 27919,
            "range": "± 391",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 48781,
            "range": "± 979",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 36286,
            "range": "± 347",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 112801,
            "range": "± 1179",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 93678,
            "range": "± 1081",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 112016,
            "range": "± 1762",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 94622,
            "range": "± 1418",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 58874,
            "range": "± 500",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 49628,
            "range": "± 410",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 112420,
            "range": "± 1282",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 93708,
            "range": "± 591",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2431145945,
            "range": "± 91072994",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3215,
            "range": "± 117",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6075,
            "range": "± 117",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5229,
            "range": "± 180",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 7691,
            "range": "± 97",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8792,
            "range": "± 277",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14626,
            "range": "± 323",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 366410,
            "range": "± 2495",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 375330,
            "range": "± 2388",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 439693,
            "range": "± 8936",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 532266,
            "range": "± 6667",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 322554,
            "range": "± 3450",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "2ead9a0a18b9ab3547246f6a715ced87383b9853",
          "message": "⚡ Bolt: Optimize projection bindings by eliminating redundant String cloning",
          "timestamp": "2026-09-11T23:15:31Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/161/commits/2ead9a0a18b9ab3547246f6a715ced87383b9853"
        },
        "date": 1789169800080,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32939,
            "range": "± 575",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33820,
            "range": "± 213",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61622,
            "range": "± 589",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45822,
            "range": "± 534",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132922,
            "range": "± 1429",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109638,
            "range": "± 407",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 144403,
            "range": "± 1219",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 110120,
            "range": "± 2019",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69616,
            "range": "± 815",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56110,
            "range": "± 143",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132673,
            "range": "± 645",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108591,
            "range": "± 668",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3118466263,
            "range": "± 18094314",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4154,
            "range": "± 104",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7335,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5541,
            "range": "± 170",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8842,
            "range": "± 110",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9149,
            "range": "± 251",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15098,
            "range": "± 363",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 472957,
            "range": "± 2582",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 457365,
            "range": "± 1959",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 516315,
            "range": "± 2863",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 610185,
            "range": "± 1936",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 407687,
            "range": "± 1622",
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
          "id": "d9a1bf02ceefc57700ab78064ebab01c7c504679",
          "message": "Merge pull request #160 from JohnathonNow/george/cypher-missing-math-and-coalesce-3665214507410905517\n\n⚡ George: Add `sqrt`, `power`, and `coalesce` functions",
          "timestamp": "2026-09-11T19:46:23-04:00",
          "tree_id": "86e08bbcf1def081b2018b9820499b75c231c8ec",
          "url": "https://github.com/JohnathonNow/yagdb/commit/d9a1bf02ceefc57700ab78064ebab01c7c504679"
        },
        "date": 1789171029641,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 18519,
            "range": "± 601",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 19360,
            "range": "± 1089",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 33761,
            "range": "± 1717",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 26993,
            "range": "± 1280",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 75850,
            "range": "± 2998",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 64386,
            "range": "± 2718",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 75547,
            "range": "± 1887",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 62595,
            "range": "± 2037",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 40523,
            "range": "± 1124",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 33488,
            "range": "± 937",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 75370,
            "range": "± 1697",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 61613,
            "range": "± 481",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2232163718,
            "range": "± 55091730",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2421,
            "range": "± 89",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 4331,
            "range": "± 141",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 3765,
            "range": "± 141",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 5652,
            "range": "± 344",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 6326,
            "range": "± 228",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 10709,
            "range": "± 415",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 264277,
            "range": "± 10241",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 265613,
            "range": "± 5815",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 313474,
            "range": "± 3361",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 383571,
            "range": "± 11500",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 229157,
            "range": "± 11030",
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
          "id": "73436ccb599a535101c37a536de8c68b293c9a05",
          "message": "Merge pull request #161 from JohnathonNow/bolt-optimize-projection-keys-7454566737074199337\n\n⚡ Bolt: Optimize projection bindings by eliminating redundant String cloning",
          "timestamp": "2026-09-11T19:47:11-04:00",
          "tree_id": "bd7869f204fb786d78d644074fba2f6c7786b202",
          "url": "https://github.com/JohnathonNow/yagdb/commit/73436ccb599a535101c37a536de8c68b293c9a05"
        },
        "date": 1789171214122,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32904,
            "range": "± 1394",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34640,
            "range": "± 230",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61885,
            "range": "± 3336",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46471,
            "range": "± 2236",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129789,
            "range": "± 4151",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108165,
            "range": "± 441",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130171,
            "range": "± 504",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107028,
            "range": "± 257",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66525,
            "range": "± 1112",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56353,
            "range": "± 152",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129912,
            "range": "± 2689",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106792,
            "range": "± 320",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2744243445,
            "range": "± 17582865",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3781,
            "range": "± 4096",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6652,
            "range": "± 420",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5598,
            "range": "± 1748",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8606,
            "range": "± 374",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9156,
            "range": "± 242",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15011,
            "range": "± 455",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 464305,
            "range": "± 5167",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 440358,
            "range": "± 1651",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 510232,
            "range": "± 2316",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 608163,
            "range": "± 2671",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 381576,
            "range": "± 8144",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "e71f48cf372ba6139e74f372c2231cabbe048638",
          "message": "⚡ Bolt: Hoist path variable calculation to avoid redundant allocations",
          "timestamp": "2026-09-11T23:47:16Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/162/commits/e71f48cf372ba6139e74f372c2231cabbe048638"
        },
        "date": 1789236865703,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 25530,
            "range": "± 124",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 26631,
            "range": "± 278",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 47774,
            "range": "± 99",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 34928,
            "range": "± 373",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104658,
            "range": "± 1185",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 88314,
            "range": "± 208",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104373,
            "range": "± 883",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 88833,
            "range": "± 276",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 53926,
            "range": "± 98",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 44555,
            "range": "± 86",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 112333,
            "range": "± 186",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 94332,
            "range": "± 202",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2609148917,
            "range": "± 11006888",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3469,
            "range": "± 87",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6110,
            "range": "± 118",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 4520,
            "range": "± 166",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 7210,
            "range": "± 110",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 7310,
            "range": "± 204",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 12143,
            "range": "± 300",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 366554,
            "range": "± 4401",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 353967,
            "range": "± 3054",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 396552,
            "range": "± 1881",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 466671,
            "range": "± 2101",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 318993,
            "range": "± 2135",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "83dffffbfe82723564df2cf90c81ced29d6ef2ca",
          "message": "⚡ George: Add server request decompression middleware",
          "timestamp": "2026-09-11T23:47:16Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/163/commits/83dffffbfe82723564df2cf90c81ced29d6ef2ca"
        },
        "date": 1789310202548,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 25678,
            "range": "± 127",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 26338,
            "range": "± 185",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 47948,
            "range": "± 1462",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 34593,
            "range": "± 144",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104598,
            "range": "± 4511",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 88286,
            "range": "± 257",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104253,
            "range": "± 184",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 88405,
            "range": "± 287",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 53735,
            "range": "± 447",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 44304,
            "range": "± 121",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104201,
            "range": "± 275",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 88088,
            "range": "± 200",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2669436025,
            "range": "± 25604574",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3300,
            "range": "± 82",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 5829,
            "range": "± 113",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 4411,
            "range": "± 313",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 6962,
            "range": "± 84",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 7165,
            "range": "± 208",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 11790,
            "range": "± 295",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 360155,
            "range": "± 7851",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 351850,
            "range": "± 1718",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 398239,
            "range": "± 4246",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 461296,
            "range": "± 2437",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 316775,
            "range": "± 2695",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "c9ced277a8e5b8b46ebff60e29f5a33287147290",
          "message": "⚡ Bolt: Hoist path pattern allocations in PathExpand",
          "timestamp": "2026-09-11T23:47:16Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/164/commits/c9ced277a8e5b8b46ebff60e29f5a33287147290"
        },
        "date": 1789336570194,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32162,
            "range": "± 88",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34262,
            "range": "± 156",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62001,
            "range": "± 403",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46713,
            "range": "± 477",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129620,
            "range": "± 271",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107667,
            "range": "± 371",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 137736,
            "range": "± 2088",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 111773,
            "range": "± 619",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 68047,
            "range": "± 356",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 60479,
            "range": "± 541",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131461,
            "range": "± 280",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106681,
            "range": "± 379",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2746935884,
            "range": "± 17192441",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3771,
            "range": "± 618",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6594,
            "range": "± 3474",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5556,
            "range": "± 2031",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8631,
            "range": "± 568",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9117,
            "range": "± 338",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14751,
            "range": "± 292",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 465147,
            "range": "± 5866",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 435956,
            "range": "± 2659",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 507486,
            "range": "± 4941",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 603581,
            "range": "± 3588",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 380070,
            "range": "± 2601",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "6ef0a0556253e90ff10346b70391cd4b6e238fc8",
          "message": "⚡ George: [feat] Support multiple properties in Cypher SET clause",
          "timestamp": "2026-09-11T23:47:16Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/165/commits/6ef0a0556253e90ff10346b70391cd4b6e238fc8"
        },
        "date": 1789336709059,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 25627,
            "range": "± 914",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 26668,
            "range": "± 73",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 50773,
            "range": "± 797",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 34915,
            "range": "± 2174",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 105682,
            "range": "± 14722",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 88415,
            "range": "± 120",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104410,
            "range": "± 604",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 88120,
            "range": "± 409",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 53576,
            "range": "± 539",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 44111,
            "range": "± 145",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104524,
            "range": "± 2999",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 88074,
            "range": "± 228",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2553723805,
            "range": "± 21276354",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3316,
            "range": "± 500",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 5823,
            "range": "± 188",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 4438,
            "range": "± 2086",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 6921,
            "range": "± 106",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 7203,
            "range": "± 279",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 11843,
            "range": "± 4350",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 362107,
            "range": "± 2043",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 355265,
            "range": "± 1302",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 401526,
            "range": "± 2309",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 463730,
            "range": "± 1420",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 319069,
            "range": "± 2747",
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
          "id": "c330795a91972346a6071b226cd340b7fd36d0a9",
          "message": "Merge pull request #165 from JohnathonNow/george/feat-set-multiple-props-13192164158006294787\n\n⚡ George: [feat] Support multiple properties in Cypher SET clause",
          "timestamp": "2026-09-13T22:34:16-04:00",
          "tree_id": "e86c13a9339a49c97adb6c3b53321c489c9ac938",
          "url": "https://github.com/JohnathonNow/yagdb/commit/c330795a91972346a6071b226cd340b7fd36d0a9"
        },
        "date": 1789354013995,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32199,
            "range": "± 78",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34194,
            "range": "± 536",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61974,
            "range": "± 1069",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47386,
            "range": "± 267",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130307,
            "range": "± 728",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106597,
            "range": "± 430",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129724,
            "range": "± 1168",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108231,
            "range": "± 1751",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67639,
            "range": "± 123",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 57113,
            "range": "± 182",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130980,
            "range": "± 5311",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107238,
            "range": "± 596",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2852125790,
            "range": "± 16033438",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3777,
            "range": "± 159",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6593,
            "range": "± 128",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5614,
            "range": "± 199",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8584,
            "range": "± 139",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9212,
            "range": "± 231",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14929,
            "range": "± 363",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 467859,
            "range": "± 2844",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 446241,
            "range": "± 4174",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 513024,
            "range": "± 3733",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 607488,
            "range": "± 11352",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 389075,
            "range": "± 2781",
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
          "id": "723726bf04e8ca5c6ef03454bba362f141b32958",
          "message": "Merge pull request #164 from JohnathonNow/bolt/hoist-pathexpand-allocation-8898685366830097351\n\n⚡ Bolt: Hoist path pattern allocations in PathExpand",
          "timestamp": "2026-09-13T22:34:35-04:00",
          "tree_id": "4ad14460c16897a2a908b701e1ac36c1797c23f8",
          "url": "https://github.com/JohnathonNow/yagdb/commit/723726bf04e8ca5c6ef03454bba362f141b32958"
        },
        "date": 1789354041444,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32470,
            "range": "± 387",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34505,
            "range": "± 175",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62443,
            "range": "± 1267",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46922,
            "range": "± 368",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130438,
            "range": "± 2928",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107591,
            "range": "± 3803",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130295,
            "range": "± 555",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107196,
            "range": "± 3089",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67975,
            "range": "± 519",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 57427,
            "range": "± 192",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132843,
            "range": "± 3879",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107011,
            "range": "± 1348",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2862465388,
            "range": "± 27026550",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3902,
            "range": "± 142",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6694,
            "range": "± 149",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5964,
            "range": "± 292",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 9066,
            "range": "± 217",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9541,
            "range": "± 450",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15213,
            "range": "± 453",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 474749,
            "range": "± 6734",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 451324,
            "range": "± 6178",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 520638,
            "range": "± 4448",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 607847,
            "range": "± 4662",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 392075,
            "range": "± 53538",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "4ebc4bfc8d83e53090479c5b51d54142b317c29d",
          "message": "⚡ Bolt: Hoist path variable calculation to avoid redundant allocations",
          "timestamp": "2026-09-14T02:34:40Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/162/commits/4ebc4bfc8d83e53090479c5b51d54142b317c29d"
        },
        "date": 1789354042256,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32384,
            "range": "± 237",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33969,
            "range": "± 155",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62044,
            "range": "± 1419",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47621,
            "range": "± 153",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129926,
            "range": "± 2059",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108660,
            "range": "± 645",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129806,
            "range": "± 703",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108133,
            "range": "± 761",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 68201,
            "range": "± 476",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56935,
            "range": "± 496",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130757,
            "range": "± 884",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107650,
            "range": "± 538",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2728361180,
            "range": "± 22664905",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3805,
            "range": "± 108",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6654,
            "range": "± 125",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5637,
            "range": "± 177",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8663,
            "range": "± 142",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9068,
            "range": "± 227",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14551,
            "range": "± 296",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 472770,
            "range": "± 4780",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 447955,
            "range": "± 3207",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 519685,
            "range": "± 3644",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 611355,
            "range": "± 3461",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 391812,
            "range": "± 2241",
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
          "id": "0248111d80136d65a1585bfd234dbaf498304ed9",
          "message": "Merge pull request #162 from JohnathonNow/bolt-hoist-vars-6855208205761589439\n\n⚡ Bolt: Hoist path variable calculation to avoid redundant allocations",
          "timestamp": "2026-09-13T22:35:07-04:00",
          "tree_id": "b9e66b1c73e6ec4a74d875482d1412f1cab799c8",
          "url": "https://github.com/JohnathonNow/yagdb/commit/0248111d80136d65a1585bfd234dbaf498304ed9"
        },
        "date": 1789354061538,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32296,
            "range": "± 576",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34717,
            "range": "± 426",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62316,
            "range": "± 439",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47600,
            "range": "± 734",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130865,
            "range": "± 516",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107833,
            "range": "± 211",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129917,
            "range": "± 386",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106852,
            "range": "± 2949",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 68041,
            "range": "± 786",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 57072,
            "range": "± 193",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130417,
            "range": "± 2601",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107633,
            "range": "± 212",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2805558964,
            "range": "± 15654208",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3796,
            "range": "± 105",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6619,
            "range": "± 132",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5635,
            "range": "± 173",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8660,
            "range": "± 155",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8953,
            "range": "± 249",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14427,
            "range": "± 362",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 463407,
            "range": "± 7911",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 440894,
            "range": "± 4335",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 509236,
            "range": "± 2763",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 601479,
            "range": "± 3076",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 385095,
            "range": "± 2430",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "1a44a9044247955cbf9c1b0f581e923ec00a34f3",
          "message": "⚡ George: [feature improvement] Support SET n:Label Cypher syntax",
          "timestamp": "2026-09-14T02:35:12Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/166/commits/1a44a9044247955cbf9c1b0f581e923ec00a34f3"
        },
        "date": 1789446511127,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 31718,
            "range": "± 412",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34190,
            "range": "± 139",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62110,
            "range": "± 1530",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47993,
            "range": "± 234",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132135,
            "range": "± 546",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108467,
            "range": "± 498",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132208,
            "range": "± 262",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108982,
            "range": "± 555",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66668,
            "range": "± 331",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 58067,
            "range": "± 242",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131961,
            "range": "± 916",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108546,
            "range": "± 165",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2784954249,
            "range": "± 19972662",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3783,
            "range": "± 654",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6600,
            "range": "± 364",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5591,
            "range": "± 3825",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8668,
            "range": "± 426",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8889,
            "range": "± 4274",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14568,
            "range": "± 296",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 465270,
            "range": "± 5495",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 442790,
            "range": "± 6698",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 515993,
            "range": "± 3383",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 603735,
            "range": "± 3451",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 387331,
            "range": "± 2839",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "8a52880bb478b641e8d0d8708198979f12490573",
          "message": "⚡ George: [feature improvement] Support for SET node labels",
          "timestamp": "2026-09-14T02:35:12Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/167/commits/8a52880bb478b641e8d0d8708198979f12490573"
        },
        "date": 1789494833366,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 31998,
            "range": "± 296",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34219,
            "range": "± 207",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60665,
            "range": "± 1235",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47499,
            "range": "± 301",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132198,
            "range": "± 1798",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 110180,
            "range": "± 442",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132446,
            "range": "± 3619",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108992,
            "range": "± 479",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66515,
            "range": "± 2994",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 58498,
            "range": "± 254",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 137409,
            "range": "± 1167",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 113604,
            "range": "± 1682",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2776377192,
            "range": "± 18144612",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3828,
            "range": "± 321",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6720,
            "range": "± 301",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5631,
            "range": "± 1974",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8606,
            "range": "± 500",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9047,
            "range": "± 3323",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14592,
            "range": "± 432",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 466382,
            "range": "± 5496",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 448176,
            "range": "± 2625",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 513740,
            "range": "± 5878",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 604116,
            "range": "± 4345",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 388936,
            "range": "± 4642",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "75ae49523193818021921de6eead684b0921b73d",
          "message": "⚡ George: [feature improvement] Support setting labels via SET clause",
          "timestamp": "2026-09-14T02:35:12Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/168/commits/75ae49523193818021921de6eead684b0921b73d"
        },
        "date": 1789578749953,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 31770,
            "range": "± 2395",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34491,
            "range": "± 266",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61942,
            "range": "± 132",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47288,
            "range": "± 148",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133011,
            "range": "± 325",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109049,
            "range": "± 228",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131592,
            "range": "± 2854",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109016,
            "range": "± 901",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67010,
            "range": "± 1745",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56611,
            "range": "± 655",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132625,
            "range": "± 2388",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108541,
            "range": "± 565",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2778126266,
            "range": "± 23527804",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3820,
            "range": "± 186",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6591,
            "range": "± 133",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5715,
            "range": "± 198",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8710,
            "range": "± 144",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9148,
            "range": "± 252",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14756,
            "range": "± 411",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 476756,
            "range": "± 2148",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 456909,
            "range": "± 3598",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 525202,
            "range": "± 3379",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 618982,
            "range": "± 6001",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 399738,
            "range": "± 2898",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "5f7594011140a454d7c1d9d4c03662f6864115e5",
          "message": "⚡ George: [feature improvement] Support for SET node labels",
          "timestamp": "2026-09-14T02:35:12Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/167/commits/5f7594011140a454d7c1d9d4c03662f6864115e5"
        },
        "date": 1789578875143,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 18349,
            "range": "± 535",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 18964,
            "range": "± 1061",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 33950,
            "range": "± 1887",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 24552,
            "range": "± 873",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 72287,
            "range": "± 4395",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 59863,
            "range": "± 1181",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 71144,
            "range": "± 3192",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 58362,
            "range": "± 2979",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 36010,
            "range": "± 831",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 30587,
            "range": "± 940",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 73201,
            "range": "± 1736",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 60812,
            "range": "± 1362",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2131964407,
            "range": "± 51770968",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2457,
            "range": "± 517",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 4555,
            "range": "± 247",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 3471,
            "range": "± 1876",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 5461,
            "range": "± 354",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 5511,
            "range": "± 719",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 8914,
            "range": "± 2179",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 260823,
            "range": "± 14394",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 268062,
            "range": "± 15102",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 301497,
            "range": "± 7482",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 353269,
            "range": "± 15901",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 242635,
            "range": "± 3359",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "2ba553d9a83b5a16d0fd7f734962cdf483575079",
          "message": "⚡ George: [feature improvement] Support for SET node labels",
          "timestamp": "2026-09-14T02:35:12Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/167/commits/2ba553d9a83b5a16d0fd7f734962cdf483575079"
        },
        "date": 1789578907520,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 27864,
            "range": "± 49",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 29848,
            "range": "± 154",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 52325,
            "range": "± 1144",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 39688,
            "range": "± 307",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 119556,
            "range": "± 4037",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 99599,
            "range": "± 441",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 119048,
            "range": "± 1601",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 98658,
            "range": "± 497",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60684,
            "range": "± 955",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 52399,
            "range": "± 148",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 118225,
            "range": "± 4449",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 98776,
            "range": "± 283",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2083697326,
            "range": "± 5670636",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3277,
            "range": "± 291",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6019,
            "range": "± 212",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5411,
            "range": "± 1830",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 7843,
            "range": "± 225",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8721,
            "range": "± 530",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14039,
            "range": "± 367",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 399587,
            "range": "± 1890",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 396401,
            "range": "± 2852",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 469686,
            "range": "± 2421",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 574260,
            "range": "± 3351",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 337853,
            "range": "± 2730",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "54c7544a632fdc059acbbd23e36c44b9b84514f3",
          "message": "⚡ George: [feature improvement] Support for SET node labels",
          "timestamp": "2026-09-14T02:35:12Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/167/commits/54c7544a632fdc059acbbd23e36c44b9b84514f3"
        },
        "date": 1789579002182,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32853,
            "range": "± 84",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34860,
            "range": "± 6584",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61936,
            "range": "± 1239",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46270,
            "range": "± 183",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132227,
            "range": "± 282",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108654,
            "range": "± 169",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132634,
            "range": "± 1779",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109008,
            "range": "± 350",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69448,
            "range": "± 1595",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56133,
            "range": "± 2274",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132663,
            "range": "± 377",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 110125,
            "range": "± 2946",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3109443207,
            "range": "± 46671723",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4302,
            "range": "± 367",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7570,
            "range": "± 379",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5701,
            "range": "± 1893",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8953,
            "range": "± 161",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9159,
            "range": "± 302",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14804,
            "range": "± 775",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 480933,
            "range": "± 5188",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 464398,
            "range": "± 9006",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 522748,
            "range": "± 9032",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 607198,
            "range": "± 3954",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 420584,
            "range": "± 6130",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "4ddebbfd1e087ed72f169e8918845ad89628d514",
          "message": "⚡ George: [feature improvement] Support for SET node labels",
          "timestamp": "2026-09-14T02:35:12Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/167/commits/4ddebbfd1e087ed72f169e8918845ad89628d514"
        },
        "date": 1789579042810,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32833,
            "range": "± 415",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33828,
            "range": "± 1516",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61737,
            "range": "± 1225",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45602,
            "range": "± 168",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132805,
            "range": "± 5106",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109051,
            "range": "± 318",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133010,
            "range": "± 2726",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 110297,
            "range": "± 258",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69797,
            "range": "± 2000",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56444,
            "range": "± 516",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133340,
            "range": "± 3128",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 109089,
            "range": "± 597",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3194678530,
            "range": "± 36499121",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4303,
            "range": "± 347",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7689,
            "range": "± 401",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5698,
            "range": "± 2771",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8995,
            "range": "± 665",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9401,
            "range": "± 4802",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15463,
            "range": "± 408",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 472133,
            "range": "± 16064",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 458570,
            "range": "± 2132",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 519120,
            "range": "± 2142",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 601510,
            "range": "± 2064",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 413846,
            "range": "± 2059",
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
          "id": "b868878739b7b113ef63c1333f9d84f895d9fc9d",
          "message": "Merge pull request #167 from JohnathonNow/george-add-set-label-8910916816378744951\n\n⚡ George: [feature improvement] Support for SET node labels",
          "timestamp": "2026-09-16T13:04:34-04:00",
          "tree_id": "4580fda22f47abf388365ce78e15bf8c59a1071d",
          "url": "https://github.com/JohnathonNow/yagdb/commit/b868878739b7b113ef63c1333f9d84f895d9fc9d"
        },
        "date": 1789579046740,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33310,
            "range": "± 155",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34175,
            "range": "± 181",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61453,
            "range": "± 579",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45878,
            "range": "± 324",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132666,
            "range": "± 2267",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108604,
            "range": "± 613",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133611,
            "range": "± 1096",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109361,
            "range": "± 2894",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69566,
            "range": "± 1627",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56869,
            "range": "± 128",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132397,
            "range": "± 424",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 109742,
            "range": "± 321",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3140415758,
            "range": "± 45275217",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4351,
            "range": "± 350",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7595,
            "range": "± 441",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5688,
            "range": "± 1313",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8841,
            "range": "± 785",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9112,
            "range": "± 303",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14863,
            "range": "± 786",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 479574,
            "range": "± 6187",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 469277,
            "range": "± 29263",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 527244,
            "range": "± 8177",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 617890,
            "range": "± 4617",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 422153,
            "range": "± 3406",
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
          "id": "a6540d131a54fd384c13aa5cbfd260304e05ace2",
          "message": "Merge pull request #166 from JohnathonNow/george-feature-set-node-label-17568620694269721045\n\n⚡ George: [feature improvement] Support SET n:Label Cypher syntax",
          "timestamp": "2026-09-16T13:04:58-04:00",
          "tree_id": "d70c2b5f2bd4b84656eb7c5ce057943790513f8e",
          "url": "https://github.com/JohnathonNow/yagdb/commit/a6540d131a54fd384c13aa5cbfd260304e05ace2"
        },
        "date": 1789579071278,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 35756,
            "range": "± 297",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33610,
            "range": "± 128",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61442,
            "range": "± 1630",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45864,
            "range": "± 196",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 137337,
            "range": "± 757",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109777,
            "range": "± 4470",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132613,
            "range": "± 250",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109471,
            "range": "± 307",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70383,
            "range": "± 535",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55687,
            "range": "± 214",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132397,
            "range": "± 965",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 109419,
            "range": "± 334",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3132669463,
            "range": "± 20755108",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4234,
            "range": "± 341",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7487,
            "range": "± 238",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5643,
            "range": "± 381",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8846,
            "range": "± 270",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9135,
            "range": "± 296",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15010,
            "range": "± 392",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 478444,
            "range": "± 11067",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 476789,
            "range": "± 2433",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 535731,
            "range": "± 2792",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 629958,
            "range": "± 16078",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 431157,
            "range": "± 5268",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "c1333b08ad6ad18dc2eeee4de9dab1514d35904e",
          "message": "⚡ Bolt: [performance improvement]",
          "timestamp": "2026-09-16T17:05:03Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/169/commits/c1333b08ad6ad18dc2eeee4de9dab1514d35904e"
        },
        "date": 1789582603731,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33808,
            "range": "± 159",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 35221,
            "range": "± 732",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61498,
            "range": "± 443",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47648,
            "range": "± 350",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132134,
            "range": "± 430",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109566,
            "range": "± 380",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132506,
            "range": "± 573",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109770,
            "range": "± 653",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66744,
            "range": "± 675",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 58850,
            "range": "± 224",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132691,
            "range": "± 5486",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108692,
            "range": "± 186",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2831803796,
            "range": "± 28356965",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3665,
            "range": "± 302",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6230,
            "range": "± 123",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5652,
            "range": "± 175",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8456,
            "range": "± 171",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9065,
            "range": "± 231",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14602,
            "range": "± 373",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 464933,
            "range": "± 4102",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 440011,
            "range": "± 8178",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 505777,
            "range": "± 4337",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 605277,
            "range": "± 4794",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 382571,
            "range": "± 2394",
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
          "id": "ed5123974868be5aae10e7da749b4dfef0f54b31",
          "message": "Merge pull request #169 from JohnathonNow/bolt-perf-execute-create-path-15760270490694575342\n\n⚡ Bolt: [performance improvement]",
          "timestamp": "2026-09-16T16:10:10-04:00",
          "tree_id": "ef6447f2af4d41e98395b00c4d40ee55de8c15f2",
          "url": "https://github.com/JohnathonNow/yagdb/commit/ed5123974868be5aae10e7da749b4dfef0f54b31"
        },
        "date": 1789590144486,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33112,
            "range": "± 980",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34987,
            "range": "± 338",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61769,
            "range": "± 162",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46942,
            "range": "± 159",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131814,
            "range": "± 1542",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109893,
            "range": "± 812",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131653,
            "range": "± 1238",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109128,
            "range": "± 421",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66442,
            "range": "± 487",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 58421,
            "range": "± 172",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132058,
            "range": "± 523",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108804,
            "range": "± 214",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2720996682,
            "range": "± 12253370",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3580,
            "range": "± 475",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6067,
            "range": "± 289",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5544,
            "range": "± 1324",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8273,
            "range": "± 127",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8822,
            "range": "± 227",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14448,
            "range": "± 364",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 456148,
            "range": "± 5123",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 431410,
            "range": "± 2326",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 500159,
            "range": "± 2440",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 595105,
            "range": "± 2557",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 375616,
            "range": "± 2391",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "d02d34c2bfe3b7948a9be11c30770d14d6db8ba8",
          "message": "⚡ George: [feature improvement] add HTTP request decompression",
          "timestamp": "2026-09-16T20:10:15Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/170/commits/d02d34c2bfe3b7948a9be11c30770d14d6db8ba8"
        },
        "date": 1789740461142,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33013,
            "range": "± 981",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34146,
            "range": "± 172",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 65599,
            "range": "± 941",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46731,
            "range": "± 284",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132827,
            "range": "± 1884",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109596,
            "range": "± 472",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132558,
            "range": "± 468",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108875,
            "range": "± 334",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70221,
            "range": "± 612",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 58311,
            "range": "± 157",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133650,
            "range": "± 1221",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 110267,
            "range": "± 420",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3135994256,
            "range": "± 19662930",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4117,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7079,
            "range": "± 127",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5646,
            "range": "± 212",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8753,
            "range": "± 161",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9191,
            "range": "± 262",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14915,
            "range": "± 358",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 469197,
            "range": "± 6620",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 449510,
            "range": "± 4952",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 508086,
            "range": "± 5762",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 601215,
            "range": "± 3898",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 404411,
            "range": "± 5854",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "071ab00ef3494b011bfebc25cfbb39101e27aa91",
          "message": "⚡ Bolt: [performance improvement] Hoist ResultSet allocation in match_var_length_edges",
          "timestamp": "2026-09-16T20:10:15Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/171/commits/071ab00ef3494b011bfebc25cfbb39101e27aa91"
        },
        "date": 1789755589555,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 31678,
            "range": "± 144",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34523,
            "range": "± 89",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60419,
            "range": "± 2460",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47405,
            "range": "± 161",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132182,
            "range": "± 3650",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109256,
            "range": "± 950",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132101,
            "range": "± 341",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109336,
            "range": "± 688",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67333,
            "range": "± 594",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56457,
            "range": "± 254",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132011,
            "range": "± 2133",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 109590,
            "range": "± 300",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2769972459,
            "range": "± 16397000",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3607,
            "range": "± 107",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6164,
            "range": "± 127",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5568,
            "range": "± 175",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8379,
            "range": "± 148",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8911,
            "range": "± 235",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14426,
            "range": "± 302",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 458999,
            "range": "± 9367",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 434900,
            "range": "± 3208",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 502532,
            "range": "± 3068",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 594387,
            "range": "± 2805",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 372553,
            "range": "± 3985",
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
          "id": "eddf9b2b79971a89c50b0eef5d7daef410f74cd7",
          "message": "Merge pull request #171 from JohnathonNow/bolt-hoist-match-var-length-edges-6794492523531731769\n\n⚡ Bolt: [performance improvement] Hoist ResultSet allocation in match_var_length_edges",
          "timestamp": "2026-09-18T16:11:59-04:00",
          "tree_id": "688323a7a9f8ac3ccbd098eacec6da9366ebd468",
          "url": "https://github.com/JohnathonNow/yagdb/commit/eddf9b2b79971a89c50b0eef5d7daef410f74cd7"
        },
        "date": 1789763074408,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 31779,
            "range": "± 301",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34530,
            "range": "± 1147",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60664,
            "range": "± 880",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47198,
            "range": "± 647",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131961,
            "range": "± 1119",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109734,
            "range": "± 480",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132587,
            "range": "± 4308",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109199,
            "range": "± 315",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67143,
            "range": "± 225",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55710,
            "range": "± 484",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132072,
            "range": "± 443",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 109511,
            "range": "± 431",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2789433556,
            "range": "± 20892270",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3573,
            "range": "± 107",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6163,
            "range": "± 145",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5591,
            "range": "± 190",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8411,
            "range": "± 139",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8897,
            "range": "± 234",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14529,
            "range": "± 351",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 464721,
            "range": "± 2958",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 436489,
            "range": "± 2339",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 506879,
            "range": "± 4614",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 602875,
            "range": "± 52598",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 378920,
            "range": "± 7015",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "3ab07714d99ca9b09ee0e13b11bdf58c2bb140a2",
          "message": "⚡ George: [Request Decompression middleware]",
          "timestamp": "2026-09-18T20:12:04Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/172/commits/3ab07714d99ca9b09ee0e13b11bdf58c2bb140a2"
        },
        "date": 1789884584452,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 28538,
            "range": "± 308",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 29656,
            "range": "± 119",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 53462,
            "range": "± 334",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 40367,
            "range": "± 422",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 119591,
            "range": "± 615",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 99176,
            "range": "± 1797",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 119952,
            "range": "± 365",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 98541,
            "range": "± 315",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62150,
            "range": "± 594",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 52344,
            "range": "± 602",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 119544,
            "range": "± 2083",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 98706,
            "range": "± 272",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2158058300,
            "range": "± 27950420",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3184,
            "range": "± 419",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 5456,
            "range": "± 158",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5503,
            "range": "± 973",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 7889,
            "range": "± 351",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8725,
            "range": "± 2259",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14198,
            "range": "± 566",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 390120,
            "range": "± 5907",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 383261,
            "range": "± 7466",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 453109,
            "range": "± 2734",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 554584,
            "range": "± 3058",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 325235,
            "range": "± 2305",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "65f8c29d210d64e84a6f1f1ead142e131416ec78",
          "message": "⚡ George: [HTTP Request Decompression]",
          "timestamp": "2026-09-18T20:12:04Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/173/commits/65f8c29d210d64e84a6f1f1ead142e131416ec78"
        },
        "date": 1789913869701,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 18362,
            "range": "± 254",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 19684,
            "range": "± 844",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 33915,
            "range": "± 3501",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 27041,
            "range": "± 1199",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 78591,
            "range": "± 326",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 64466,
            "range": "± 620",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 79953,
            "range": "± 4365",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 66112,
            "range": "± 2160",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 41681,
            "range": "± 521",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 37430,
            "range": "± 2278",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 79755,
            "range": "± 2539",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 66204,
            "range": "± 1688",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2257201829,
            "range": "± 41798603",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2290,
            "range": "± 259",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 3869,
            "range": "± 348",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 3797,
            "range": "± 2411",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 5394,
            "range": "± 350",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 6155,
            "range": "± 290",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 10186,
            "range": "± 613",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 258807,
            "range": "± 3477",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 259343,
            "range": "± 7073",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 310397,
            "range": "± 15530",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 378507,
            "range": "± 21765",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 220081,
            "range": "± 13423",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "ecd8059b661d089b2ce1a358b1664949f1d9bbb1",
          "message": "⚡ Bolt: [performance improvement] Eliminate Bindings Vec Allocation",
          "timestamp": "2026-09-18T20:12:04Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/174/commits/ecd8059b661d089b2ce1a358b1664949f1d9bbb1"
        },
        "date": 1790053212008,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 34145,
            "range": "± 372",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34727,
            "range": "± 83",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60416,
            "range": "± 1502",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47218,
            "range": "± 192",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132789,
            "range": "± 1743",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 110284,
            "range": "± 453",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131875,
            "range": "± 291",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109205,
            "range": "± 406",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67372,
            "range": "± 676",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 57469,
            "range": "± 1913",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132113,
            "range": "± 1393",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 110854,
            "range": "± 295",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2746860914,
            "range": "± 27374470",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3676,
            "range": "± 646",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6183,
            "range": "± 337",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5616,
            "range": "± 648",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8583,
            "range": "± 316",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9016,
            "range": "± 257",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14476,
            "range": "± 321",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 462754,
            "range": "± 2723",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 438734,
            "range": "± 2778",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 503660,
            "range": "± 3316",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 596392,
            "range": "± 6121",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 376707,
            "range": "± 3166",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "f068c1caaeb3e9d82c6763583f8877d5dd8f127a",
          "message": "⚡ George: [Add request decompression feature]",
          "timestamp": "2026-09-18T20:12:04Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/175/commits/f068c1caaeb3e9d82c6763583f8877d5dd8f127a"
        },
        "date": 1790086663840,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 25648,
            "range": "± 298",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 26642,
            "range": "± 531",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 47825,
            "range": "± 320",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 35792,
            "range": "± 75",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104713,
            "range": "± 2559",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 87642,
            "range": "± 354",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 105279,
            "range": "± 2269",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 88153,
            "range": "± 3747",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 53852,
            "range": "± 1642",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 44590,
            "range": "± 2760",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104332,
            "range": "± 742",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 87890,
            "range": "± 229",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2632824655,
            "range": "± 22969655",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3231,
            "range": "± 452",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 5509,
            "range": "± 220",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 4438,
            "range": "± 914",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 6829,
            "range": "± 346",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 7122,
            "range": "± 1884",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 11574,
            "range": "± 307",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 365274,
            "range": "± 2686",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 350197,
            "range": "± 2794",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 394905,
            "range": "± 17072",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 460114,
            "range": "± 8224",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 314083,
            "range": "± 2933",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "871d4d7447b2f53b630ef6e0f5536b66e70293e6",
          "message": "⚡ George: [feature improvement] ADD support for `SET n += {...}` and RequestDecompressionLayer",
          "timestamp": "2026-09-18T20:12:04Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/176/commits/871d4d7447b2f53b630ef6e0f5536b66e70293e6"
        },
        "date": 1790223484741,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 29352,
            "range": "± 80",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 29823,
            "range": "± 83",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 52632,
            "range": "± 1269",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 39861,
            "range": "± 255",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 119016,
            "range": "± 288",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 99003,
            "range": "± 1396",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 118358,
            "range": "± 3024",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 99635,
            "range": "± 1208",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 59360,
            "range": "± 719",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 50641,
            "range": "± 117",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 117588,
            "range": "± 297",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 98884,
            "range": "± 378",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2176904513,
            "range": "± 44817583",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3296,
            "range": "± 114",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 5536,
            "range": "± 129",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5700,
            "range": "± 213",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8117,
            "range": "± 141",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8869,
            "range": "± 354",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14392,
            "range": "± 390",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 391571,
            "range": "± 2050",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 378718,
            "range": "± 9226",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 451036,
            "range": "± 2595",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 555787,
            "range": "± 2880",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 319751,
            "range": "± 2028",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "5fdd25e38c1d9f5c2f2944cc91bb716da95e5dd1",
          "message": "⚡ Bolt: [performance improvement] avoid Vec allocations in graph traversal",
          "timestamp": "2026-09-18T20:12:04Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/177/commits/5fdd25e38c1d9f5c2f2944cc91bb716da95e5dd1"
        },
        "date": 1790359579604,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 17744,
            "range": "± 277",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 18237,
            "range": "± 1077",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 31583,
            "range": "± 272",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 22994,
            "range": "± 261",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 68939,
            "range": "± 1033",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55313,
            "range": "± 5253",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67602,
            "range": "± 2197",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55290,
            "range": "± 509",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 34229,
            "range": "± 2403",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 28977,
            "range": "± 530",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 71289,
            "range": "± 3115",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 55448,
            "range": "± 648",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2069058653,
            "range": "± 92507143",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2265,
            "range": "± 601",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 4020,
            "range": "± 93",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 3274,
            "range": "± 103",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 5041,
            "range": "± 186",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 5360,
            "range": "± 204",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 8526,
            "range": "± 250",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 251733,
            "range": "± 6182",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 253780,
            "range": "± 19168",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 287526,
            "range": "± 6709",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 339517,
            "range": "± 13654",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 229879,
            "range": "± 5817",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "19857ae5086a497c203d8427382c85f7ad293fc6",
          "message": "⚡ Bolt: [performance improvement] Replace Vec allocations with stack arrays in traversal bindings",
          "timestamp": "2026-09-18T20:12:04Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/178/commits/19857ae5086a497c203d8427382c85f7ad293fc6"
        },
        "date": 1790447460632,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32854,
            "range": "± 152",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 35371,
            "range": "± 82",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61883,
            "range": "± 854",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47308,
            "range": "± 285",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129463,
            "range": "± 261",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107345,
            "range": "± 571",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129665,
            "range": "± 1233",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107033,
            "range": "± 339",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67171,
            "range": "± 356",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55749,
            "range": "± 165",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130182,
            "range": "± 1847",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106923,
            "range": "± 614",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2741888660,
            "range": "± 24561483",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3712,
            "range": "± 589",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6232,
            "range": "± 291",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5699,
            "range": "± 3853",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8526,
            "range": "± 453",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9052,
            "range": "± 264",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14594,
            "range": "± 304",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 468488,
            "range": "± 6982",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 447582,
            "range": "± 2949",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 511670,
            "range": "± 4187",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 603101,
            "range": "± 5170",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 390073,
            "range": "± 2398",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "ddbe2159fc6fa991e8def99984fa3d4e2335ccd7",
          "message": "⚡ George: [AST Query Cache]",
          "timestamp": "2026-09-18T20:12:04Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/179/commits/ddbe2159fc6fa991e8def99984fa3d4e2335ccd7"
        },
        "date": 1790479403164,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 17308,
            "range": "± 182",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 18209,
            "range": "± 729",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 31935,
            "range": "± 693",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 23797,
            "range": "± 1450",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 68932,
            "range": "± 2111",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55205,
            "range": "± 898",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69267,
            "range": "± 1368",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56487,
            "range": "± 2332",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 34256,
            "range": "± 580",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 28938,
            "range": "± 865",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70638,
            "range": "± 3630",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 55610,
            "range": "± 765",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2037488237,
            "range": "± 28377950",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2472,
            "range": "± 113",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 4476,
            "range": "± 53",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 3749,
            "range": "± 139",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 5601,
            "range": "± 177",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 6093,
            "range": "± 213",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 9508,
            "range": "± 497",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 230173,
            "range": "± 5373",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 318889,
            "range": "± 10710",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 324750,
            "range": "± 11338",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 299431,
            "range": "± 8659",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 293725,
            "range": "± 6134",
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
          "id": "9e3fdbe91679e3e026acbe13ed11d91600ae6b60",
          "message": "Merge pull request #179 from JohnathonNow/george/ast-query-cache-4374693734609414600\n\n⚡ George: [AST Query Cache]",
          "timestamp": "2026-09-26T20:39:56-07:00",
          "tree_id": "2fb3a6a41cca1c1dd92f2c37788530b1c6c4840e",
          "url": "https://github.com/JohnathonNow/yagdb/commit/9e3fdbe91679e3e026acbe13ed11d91600ae6b60"
        },
        "date": 1790481109709,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 26056,
            "range": "± 395",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 27345,
            "range": "± 611",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 48176,
            "range": "± 463",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 36816,
            "range": "± 447",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 113449,
            "range": "± 2796",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 89919,
            "range": "± 681",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 113524,
            "range": "± 984",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 90080,
            "range": "± 761",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 59199,
            "range": "± 1030",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47258,
            "range": "± 608",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 112685,
            "range": "± 1164",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 89582,
            "range": "± 538",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2436754490,
            "range": "± 20450720",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3461,
            "range": "± 109",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6375,
            "range": "± 156",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6021,
            "range": "± 221",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8337,
            "range": "± 151",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9760,
            "range": "± 491",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15821,
            "range": "± 507",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 343445,
            "range": "± 5344",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 459527,
            "range": "± 10159",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 481551,
            "range": "± 7645",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 483390,
            "range": "± 4307",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 399744,
            "range": "± 10159",
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
          "id": "9a248d7fa79d0235f2e11a5d4d82499a7daaee4d",
          "message": "Merge pull request #178 from JohnathonNow/bolt-optimize-graph-traversal-bindings-1783124345215442401\n\n⚡ Bolt: [performance improvement] Replace Vec allocations with stack arrays in traversal bindings",
          "timestamp": "2026-09-26T20:40:16-07:00",
          "tree_id": "5704b549b5a1197c33e7dad8a152b14bbf639d68",
          "url": "https://github.com/JohnathonNow/yagdb/commit/9a248d7fa79d0235f2e11a5d4d82499a7daaee4d"
        },
        "date": 1790481158615,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33322,
            "range": "± 219",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34910,
            "range": "± 108",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62036,
            "range": "± 1726",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46995,
            "range": "± 204",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129556,
            "range": "± 1038",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107271,
            "range": "± 330",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129724,
            "range": "± 2997",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107776,
            "range": "± 1925",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67231,
            "range": "± 389",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55786,
            "range": "± 216",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129957,
            "range": "± 469",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106893,
            "range": "± 597",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2763983842,
            "range": "± 12510895",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3989,
            "range": "± 420",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6849,
            "range": "± 4146",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6449,
            "range": "± 6039",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 9439,
            "range": "± 309",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 10219,
            "range": "± 290",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 16071,
            "range": "± 401",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 395692,
            "range": "± 5618",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 524189,
            "range": "± 7821",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 529971,
            "range": "± 11339",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 491720,
            "range": "± 4309",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 455673,
            "range": "± 5252",
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
          "id": "310cf78b8590c68fc6aaae6f599b57c8ceaa37a5",
          "message": "Merge pull request #176 from JohnathonNow/george-features-5252246797193996564\n\n⚡ George: [feature improvement] ADD support for `SET n += {...}` and RequestDecompressionLayer",
          "timestamp": "2026-09-26T20:40:48-07:00",
          "tree_id": "5704b549b5a1197c33e7dad8a152b14bbf639d68",
          "url": "https://github.com/JohnathonNow/yagdb/commit/310cf78b8590c68fc6aaae6f599b57c8ceaa37a5"
        },
        "date": 1790481205216,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33444,
            "range": "± 473",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 35317,
            "range": "± 782",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62071,
            "range": "± 6007",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 48555,
            "range": "± 307",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129667,
            "range": "± 2300",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106645,
            "range": "± 2839",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129821,
            "range": "± 2595",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107410,
            "range": "± 689",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 68905,
            "range": "± 1608",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55596,
            "range": "± 666",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130151,
            "range": "± 765",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107013,
            "range": "± 407",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2817798014,
            "range": "± 18670103",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4019,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6926,
            "range": "± 276",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6402,
            "range": "± 241",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 9390,
            "range": "± 207",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 10088,
            "range": "± 523",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15978,
            "range": "± 517",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 412161,
            "range": "± 11724",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 532370,
            "range": "± 17474",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 539888,
            "range": "± 8360",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 504976,
            "range": "± 6513",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 461630,
            "range": "± 11859",
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
          "id": "8e469c50e25e001ee24f7a6411f1036c34cda0ac",
          "message": "Merge pull request #175 from JohnathonNow/george/request-decompression-5873673679630875343\n\n⚡ George: [Add request decompression feature]",
          "timestamp": "2026-09-26T20:41:02-07:00",
          "tree_id": "3e83f05d0113cd934be9c420ded9f577107ba743",
          "url": "https://github.com/JohnathonNow/yagdb/commit/8e469c50e25e001ee24f7a6411f1036c34cda0ac"
        },
        "date": 1790481210034,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33500,
            "range": "± 108",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34191,
            "range": "± 257",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61532,
            "range": "± 1059",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45680,
            "range": "± 158",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131265,
            "range": "± 2036",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107251,
            "range": "± 1873",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129640,
            "range": "± 1632",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106412,
            "range": "± 355",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67266,
            "range": "± 490",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55760,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129871,
            "range": "± 495",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106369,
            "range": "± 319",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2689533025,
            "range": "± 15482007",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3925,
            "range": "± 105",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6814,
            "range": "± 127",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6165,
            "range": "± 205",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 9082,
            "range": "± 127",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9923,
            "range": "± 436",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15866,
            "range": "± 453",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 394018,
            "range": "± 4068",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 524825,
            "range": "± 13713",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 529550,
            "range": "± 5643",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 486083,
            "range": "± 2808",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 452785,
            "range": "± 6305",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "e8888c70ff709659ce22a4fb2a46db50a1ef3429",
          "message": "⚡ George: [feature improvement] Add IS NULL / IS NOT NULL operators",
          "timestamp": "2026-09-27T03:41:06Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/180/commits/e8888c70ff709659ce22a4fb2a46db50a1ef3429"
        },
        "date": 1790531491788,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 28413,
            "range": "± 1629",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 29604,
            "range": "± 138",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 52728,
            "range": "± 657",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 40409,
            "range": "± 207",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 116653,
            "range": "± 476",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 97410,
            "range": "± 1182",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 117538,
            "range": "± 281",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 97371,
            "range": "± 959",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60578,
            "range": "± 678",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 51406,
            "range": "± 213",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 116666,
            "range": "± 3173",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 101778,
            "range": "± 285",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2217517733,
            "range": "± 22513323",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3474,
            "range": "± 143",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6199,
            "range": "± 131",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6369,
            "range": "± 282",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8625,
            "range": "± 129",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 10025,
            "range": "± 431",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15910,
            "range": "± 521",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 359498,
            "range": "± 2634",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 469343,
            "range": "± 6725",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 489204,
            "range": "± 4971",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 487923,
            "range": "± 3004",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 404010,
            "range": "± 4994",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "c4a7896883bc9efc3dbf498cd24cc6fc0dc2fd97",
          "message": "⚡ George: [feature improvement] Support setting multiple properties via map expressions",
          "timestamp": "2026-09-27T03:41:06Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/181/commits/c4a7896883bc9efc3dbf498cd24cc6fc0dc2fd97"
        },
        "date": 1790613272455,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33000,
            "range": "± 79",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33933,
            "range": "± 445",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61710,
            "range": "± 733",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47940,
            "range": "± 169",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132714,
            "range": "± 3305",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108194,
            "range": "± 246",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133210,
            "range": "± 617",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107311,
            "range": "± 1890",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70574,
            "range": "± 579",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56153,
            "range": "± 161",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133480,
            "range": "± 565",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107267,
            "range": "± 748",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3077234904,
            "range": "± 19508438",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4466,
            "range": "± 140",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7780,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6447,
            "range": "± 223",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 9630,
            "range": "± 147",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 10277,
            "range": "± 386",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 16228,
            "range": "± 491",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 409185,
            "range": "± 4675",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 558817,
            "range": "± 9271",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 554158,
            "range": "± 3738",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 516719,
            "range": "± 5077",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 495664,
            "range": "± 6804",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "352187703fb22a69b352253434e5c458fc7ae94d",
          "message": "⚡ George: [feature improvement] Add IS NULL / IS NOT NULL operators",
          "timestamp": "2026-09-28T22:48:39Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/180/commits/352187703fb22a69b352253434e5c458fc7ae94d"
        },
        "date": 1790636495022,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32328,
            "range": "± 356",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33976,
            "range": "± 235",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62670,
            "range": "± 1074",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46597,
            "range": "± 272",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129782,
            "range": "± 4267",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107026,
            "range": "± 4803",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130085,
            "range": "± 411",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106421,
            "range": "± 159",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66083,
            "range": "± 332",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55923,
            "range": "± 996",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129921,
            "range": "± 1696",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106871,
            "range": "± 269",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2768007463,
            "range": "± 11207442",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4007,
            "range": "± 324",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6883,
            "range": "± 264",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6356,
            "range": "± 1977",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 9300,
            "range": "± 374",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 10086,
            "range": "± 309",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15865,
            "range": "± 407",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 406131,
            "range": "± 3850",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 535877,
            "range": "± 8453",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 541619,
            "range": "± 4581",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 499210,
            "range": "± 4540",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 468084,
            "range": "± 6998",
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
          "id": "22e1ae7b8459d4a0d73256dda5f42535c642f433",
          "message": "Merge pull request #181 from JohnathonNow/jules-16607030950959433908-af732f15\n\n⚡ George: [feature improvement] Support setting multiple properties via map expressions",
          "timestamp": "2026-09-28T15:48:34-07:00",
          "tree_id": "806aca21636f51a0215d45c5040b3e265917469d",
          "url": "https://github.com/JohnathonNow/yagdb/commit/22e1ae7b8459d4a0d73256dda5f42535c642f433"
        },
        "date": 1790636500797,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33049,
            "range": "± 769",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33905,
            "range": "± 158",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61987,
            "range": "± 1458",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46515,
            "range": "± 454",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 135435,
            "range": "± 5718",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107136,
            "range": "± 374",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132385,
            "range": "± 933",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 109603,
            "range": "± 2697",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70541,
            "range": "± 985",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55449,
            "range": "± 195",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132813,
            "range": "± 1844",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107920,
            "range": "± 3889",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3212413609,
            "range": "± 35422840",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4561,
            "range": "± 153",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7935,
            "range": "± 269",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6636,
            "range": "± 265",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 9843,
            "range": "± 133",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 10282,
            "range": "± 443",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 16416,
            "range": "± 550",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 402068,
            "range": "± 10566",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 550188,
            "range": "± 11624",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 541888,
            "range": "± 6012",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 505752,
            "range": "± 5687",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 496590,
            "range": "± 8677",
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
          "id": "1906da669bf85810c0133b9d9853f768ca87c19e",
          "message": "Merge pull request #180 from JohnathonNow/george/is-null-10061347606948102607\n\n⚡ George: [feature improvement] Add IS NULL / IS NOT NULL operators",
          "timestamp": "2026-09-28T15:49:13-07:00",
          "tree_id": "48d65ed6fd75582f9c0b74b79a70457a026e1d54",
          "url": "https://github.com/JohnathonNow/yagdb/commit/1906da669bf85810c0133b9d9853f768ca87c19e"
        },
        "date": 1790636538563,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32973,
            "range": "± 328",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34163,
            "range": "± 87",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61612,
            "range": "± 2229",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46178,
            "range": "± 140",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 134203,
            "range": "± 1732",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108067,
            "range": "± 300",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133232,
            "range": "± 330",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107837,
            "range": "± 2140",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70279,
            "range": "± 1170",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55580,
            "range": "± 127",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 141661,
            "range": "± 2245",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 111651,
            "range": "± 528",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3076379517,
            "range": "± 19753276",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4493,
            "range": "± 120",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7744,
            "range": "± 123",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6404,
            "range": "± 234",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 9598,
            "range": "± 136",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 10173,
            "range": "± 816",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 16170,
            "range": "± 553",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 401995,
            "range": "± 3757",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 554757,
            "range": "± 8183",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 544668,
            "range": "± 14582",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 501583,
            "range": "± 9421",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 497654,
            "range": "± 7886",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "eb4ea1486d57c9d570984fe1cb6030f66baa991d",
          "message": "⚡ George: [feature improvement] Implement MIN/MAX aggregate functions",
          "timestamp": "2026-09-28T22:49:18Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/182/commits/eb4ea1486d57c9d570984fe1cb6030f66baa991d"
        },
        "date": 1790708116325,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32912,
            "range": "± 354",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34466,
            "range": "± 796",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61651,
            "range": "± 1182",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46115,
            "range": "± 99",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 134143,
            "range": "± 4018",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108151,
            "range": "± 787",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133389,
            "range": "± 510",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107494,
            "range": "± 243",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69445,
            "range": "± 754",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55650,
            "range": "± 477",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132598,
            "range": "± 5549",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107628,
            "range": "± 2132",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3123536490,
            "range": "± 19391982",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4175,
            "range": "± 132",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7272,
            "range": "± 111",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6103,
            "range": "± 242",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 9041,
            "range": "± 156",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9747,
            "range": "± 563",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15555,
            "range": "± 525",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 382331,
            "range": "± 2984",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 500247,
            "range": "± 6112",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 509800,
            "range": "± 8461",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 490979,
            "range": "± 2822",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 448456,
            "range": "± 7539",
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
          "id": "b3b6adcfda083e59b94f0bad8782ed071c17c0f2",
          "message": "Merge pull request #182 from JohnathonNow/george/min-max-aggregates-8294485147553329204\n\n⚡ George: [feature improvement] Implement MIN/MAX aggregate functions",
          "timestamp": "2026-09-29T13:51:41-07:00",
          "tree_id": "c3dd6264433e3aa167920519a310884f76198c60",
          "url": "https://github.com/JohnathonNow/yagdb/commit/b3b6adcfda083e59b94f0bad8782ed071c17c0f2"
        },
        "date": 1790715863094,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32698,
            "range": "± 88",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34046,
            "range": "± 89",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70626,
            "range": "± 1883",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46672,
            "range": "± 4492",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130952,
            "range": "± 714",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107454,
            "range": "± 285",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129608,
            "range": "± 732",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107057,
            "range": "± 469",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 68183,
            "range": "± 440",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56968,
            "range": "± 97",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130215,
            "range": "± 1099",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106170,
            "range": "± 3640",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2848581670,
            "range": "± 19870799",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3806,
            "range": "± 98",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6462,
            "range": "± 115",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6046,
            "range": "± 206",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8791,
            "range": "± 129",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9675,
            "range": "± 335",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15308,
            "range": "± 419",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 392816,
            "range": "± 4284",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 510274,
            "range": "± 7543",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 522586,
            "range": "± 7525",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 494794,
            "range": "± 3930",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 440211,
            "range": "± 6128",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "9248eab3d5d76a83b562d28125b770f3652474b4",
          "message": "⚡ Bolt: [performance improvement] Reuse eval_args buffer in function projections",
          "timestamp": "2026-09-29T20:51:47Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/184/commits/9248eab3d5d76a83b562d28125b770f3652474b4"
        },
        "date": 1790743383606,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32399,
            "range": "± 332",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34236,
            "range": "± 250",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61855,
            "range": "± 1004",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46843,
            "range": "± 101",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129962,
            "range": "± 983",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106671,
            "range": "± 1269",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129791,
            "range": "± 2410",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106341,
            "range": "± 855",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 68296,
            "range": "± 580",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 57766,
            "range": "± 1880",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129984,
            "range": "± 2555",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106885,
            "range": "± 2591",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2679113722,
            "range": "± 42681673",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3681,
            "range": "± 657",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6270,
            "range": "± 1389",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5910,
            "range": "± 1412",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8547,
            "range": "± 419",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9512,
            "range": "± 786",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14965,
            "range": "± 355",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 387283,
            "range": "± 4832",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 495614,
            "range": "± 6146",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 509369,
            "range": "± 5472",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 478241,
            "range": "± 3694",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 432576,
            "range": "± 6343",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "649c1e56b68f80fdc12e10f526c6da8590310d6c",
          "message": "⚡ Bolt: [performance improvement] Precompute label resolution to avoid redundant lock contention during graph traversal",
          "timestamp": "2026-09-29T20:51:47Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/185/commits/649c1e56b68f80fdc12e10f526c6da8590310d6c"
        },
        "date": 1790743453402,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32351,
            "range": "± 284",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34001,
            "range": "± 704",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62295,
            "range": "± 1589",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47498,
            "range": "± 466",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130655,
            "range": "± 447",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107020,
            "range": "± 806",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130433,
            "range": "± 450",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107611,
            "range": "± 564",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 68336,
            "range": "± 553",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 57123,
            "range": "± 199",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130130,
            "range": "± 978",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106865,
            "range": "± 586",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2789589519,
            "range": "± 20404369",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3832,
            "range": "± 105",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6510,
            "range": "± 144",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6095,
            "range": "± 201",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8910,
            "range": "± 121",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9751,
            "range": "± 402",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15394,
            "range": "± 431",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 402683,
            "range": "± 3251",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 508895,
            "range": "± 7011",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 527040,
            "range": "± 6724",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 500169,
            "range": "± 3587",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 440003,
            "range": "± 6901",
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
          "id": "8250c394567a7bcaf81b0c4ed1c0128bb722a532",
          "message": "Delete patch_script.sh",
          "timestamp": "2026-09-30T09:24:26-04:00",
          "tree_id": "802bc0ab3b7c53846c7c95f6f59c1572442ed48b",
          "url": "https://github.com/JohnathonNow/yagdb/commit/8250c394567a7bcaf81b0c4ed1c0128bb722a532"
        },
        "date": 1790775369139,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 25512,
            "range": "± 481",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 26161,
            "range": "± 70",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 47708,
            "range": "± 2152",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 35626,
            "range": "± 581",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 103469,
            "range": "± 715",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 87366,
            "range": "± 287",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 103878,
            "range": "± 2455",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 87352,
            "range": "± 154",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 54282,
            "range": "± 76",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 44843,
            "range": "± 721",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 103643,
            "range": "± 262",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 86915,
            "range": "± 212",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2689589449,
            "range": "± 26858540",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3177,
            "range": "± 106",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 5648,
            "range": "± 99",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 4752,
            "range": "± 464",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 6886,
            "range": "± 91",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 7521,
            "range": "± 310",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 11859,
            "range": "± 472",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 303394,
            "range": "± 3338",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 393544,
            "range": "± 18429",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 399456,
            "range": "± 5322",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 385241,
            "range": "± 10314",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 349090,
            "range": "± 4934",
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
          "id": "55bd283092fce3500d0cc70cbdff3b3d5f498279",
          "message": "Merge pull request #185 from JohnathonNow/bolt/hoist-label-resolution-2294611145551981654\n\n⚡ Bolt: [performance improvement] Precompute label resolution to avoid redundant lock contention during graph traversal",
          "timestamp": "2026-09-30T06:23:36-07:00",
          "tree_id": "1e89c92113a19c3e89104f98d5109ececfdc84ff",
          "url": "https://github.com/JohnathonNow/yagdb/commit/55bd283092fce3500d0cc70cbdff3b3d5f498279"
        },
        "date": 1790775398103,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32847,
            "range": "± 144",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34302,
            "range": "± 336",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61645,
            "range": "± 1108",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46071,
            "range": "± 90",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132772,
            "range": "± 2282",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108639,
            "range": "± 544",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132461,
            "range": "± 730",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107239,
            "range": "± 1427",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70498,
            "range": "± 390",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56112,
            "range": "± 608",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133405,
            "range": "± 1549",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107666,
            "range": "± 520",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3121983705,
            "range": "± 24138144",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4105,
            "range": "± 257",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7167,
            "range": "± 657",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6173,
            "range": "± 2445",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8971,
            "range": "± 481",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9661,
            "range": "± 422",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15450,
            "range": "± 572",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 391561,
            "range": "± 3997",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 502943,
            "range": "± 7469",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 512030,
            "range": "± 6831",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 497426,
            "range": "± 3673",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 448028,
            "range": "± 5729",
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
          "id": "a6d618938c0d8a41e0fb4cf49a9369e3b5563b5a",
          "message": "Merge pull request #184 from JohnathonNow/bolt-optimize-projection-function-allocs-5965919185526023528\n\n⚡ Bolt: [performance improvement] Reuse eval_args buffer in function projections",
          "timestamp": "2026-09-30T06:23:54-07:00",
          "tree_id": "1cbb1dd6e759a347ca1f0c05ffe0d7c30701e223",
          "url": "https://github.com/JohnathonNow/yagdb/commit/a6d618938c0d8a41e0fb4cf49a9369e3b5563b5a"
        },
        "date": 1790775402984,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 34276,
            "range": "± 172",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 36152,
            "range": "± 302",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60783,
            "range": "± 1168",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47044,
            "range": "± 161",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130983,
            "range": "± 628",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106745,
            "range": "± 458",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130737,
            "range": "± 750",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107601,
            "range": "± 582",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66368,
            "range": "± 1419",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56783,
            "range": "± 499",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130085,
            "range": "± 1109",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107218,
            "range": "± 970",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2911953607,
            "range": "± 44416125",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3796,
            "range": "± 99",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6519,
            "range": "± 117",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6061,
            "range": "± 199",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8755,
            "range": "± 91",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9738,
            "range": "± 299",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15351,
            "range": "± 405",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 394568,
            "range": "± 3544",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 504310,
            "range": "± 7178",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 520314,
            "range": "± 5431",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 492880,
            "range": "± 4509",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 433308,
            "range": "± 7181",
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
          "id": "be27447dffa055f30c79e90b2e1157530df2944d",
          "message": "Delete patch.diff",
          "timestamp": "2026-09-30T09:24:16-04:00",
          "tree_id": "c14a1c1d440f4805576f6474760037d6cef26104",
          "url": "https://github.com/JohnathonNow/yagdb/commit/be27447dffa055f30c79e90b2e1157530df2944d"
        },
        "date": 1790775417858,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32849,
            "range": "± 109",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34484,
            "range": "± 208",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60536,
            "range": "± 564",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46994,
            "range": "± 165",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130016,
            "range": "± 1021",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106530,
            "range": "± 754",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130400,
            "range": "± 3336",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107366,
            "range": "± 1581",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66063,
            "range": "± 404",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56052,
            "range": "± 136",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130139,
            "range": "± 288",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106942,
            "range": "± 774",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2789546800,
            "range": "± 29930498",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3801,
            "range": "± 107",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6558,
            "range": "± 141",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6063,
            "range": "± 310",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8699,
            "range": "± 125",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9660,
            "range": "± 715",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15086,
            "range": "± 548",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 391814,
            "range": "± 3545",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 507033,
            "range": "± 6864",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 518393,
            "range": "± 11339",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 487647,
            "range": "± 7536",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 437963,
            "range": "± 7112",
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
          "id": "02a99e257138d64409ed534a92f6a94270b18c32",
          "message": "Delete plan.md",
          "timestamp": "2026-09-30T09:24:34-04:00",
          "tree_id": "e0d2096981adb0262278de898722dc5d6acbd9fd",
          "url": "https://github.com/JohnathonNow/yagdb/commit/02a99e257138d64409ed534a92f6a94270b18c32"
        },
        "date": 1790775428439,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32066,
            "range": "± 74",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34184,
            "range": "± 82",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60546,
            "range": "± 550",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46717,
            "range": "± 179",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129807,
            "range": "± 319",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107166,
            "range": "± 354",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130240,
            "range": "± 617",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106791,
            "range": "± 382",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66165,
            "range": "± 610",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55744,
            "range": "± 1605",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131447,
            "range": "± 425",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107206,
            "range": "± 340",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2788152931,
            "range": "± 13797110",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3757,
            "range": "± 609",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6434,
            "range": "± 1126",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5970,
            "range": "± 1645",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8695,
            "range": "± 830",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9501,
            "range": "± 283",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15109,
            "range": "± 363",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 402841,
            "range": "± 3859",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 522611,
            "range": "± 8769",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 532495,
            "range": "± 5273",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 501850,
            "range": "± 2721",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 454370,
            "range": "± 8207",
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
          "id": "9e2b3256a8e1a488f8b6b124a442efc583f33300",
          "message": "Enhance layout with sidebar and updated styles\n\nRefactor HTML structure and styles for improved layout and theme. Added a sidebar with a Cypher reference guide and updated styling for better readability.",
          "timestamp": "2026-09-30T09:27:14-04:00",
          "tree_id": "11714fc311183224f07b1d35a6a91fce9c6637ba",
          "url": "https://github.com/JohnathonNow/yagdb/commit/9e2b3256a8e1a488f8b6b124a442efc583f33300"
        },
        "date": 1790775578546,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32772,
            "range": "± 104",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34621,
            "range": "± 838",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60381,
            "range": "± 1714",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47119,
            "range": "± 1326",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129386,
            "range": "± 1996",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106970,
            "range": "± 257",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130040,
            "range": "± 6831",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107316,
            "range": "± 363",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66290,
            "range": "± 310",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55857,
            "range": "± 464",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130242,
            "range": "± 934",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106413,
            "range": "± 309",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2729252125,
            "range": "± 23818237",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3811,
            "range": "± 103",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6441,
            "range": "± 132",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5921,
            "range": "± 181",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8755,
            "range": "± 123",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9474,
            "range": "± 309",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15195,
            "range": "± 439",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 395318,
            "range": "± 5182",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 501861,
            "range": "± 8326",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 517023,
            "range": "± 5725",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 490007,
            "range": "± 6330",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 431575,
            "range": "± 6843",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "e86312d0780327e2e43e66b25389dd89c16dc987",
          "message": "⚡ George: [feature improvement]",
          "timestamp": "2026-09-30T13:28:05Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/187/commits/e86312d0780327e2e43e66b25389dd89c16dc987"
        },
        "date": 1790780020444,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 18039,
            "range": "± 281",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 18205,
            "range": "± 1191",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 33320,
            "range": "± 1160",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 23136,
            "range": "± 147",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 65865,
            "range": "± 4874",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55579,
            "range": "± 645",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66888,
            "range": "± 1132",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56307,
            "range": "± 3196",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 33969,
            "range": "± 2681",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 27951,
            "range": "± 107",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 83419,
            "range": "± 448",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 54485,
            "range": "± 458",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2054683995,
            "range": "± 36129403",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2355,
            "range": "± 61",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 4157,
            "range": "± 197",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 3547,
            "range": "± 282",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 5226,
            "range": "± 663",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 5570,
            "range": "± 420",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 9276,
            "range": "± 330",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 222727,
            "range": "± 4954",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 292798,
            "range": "± 23334",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 300288,
            "range": "± 26998",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 284788,
            "range": "± 5276",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 264167,
            "range": "± 13237",
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
          "id": "494c625e0cddee6fb0c72a98fd86b2eb3a97a813",
          "message": "Merge pull request #187 from JohnathonNow/george/implement-sum-avg-7574941223985993890\n\n⚡ George: [feature improvement]",
          "timestamp": "2026-09-30T08:12:46-07:00",
          "tree_id": "cf014b3d683bb7c5fcb7dafcc28e2900a8e6365c",
          "url": "https://github.com/JohnathonNow/yagdb/commit/494c625e0cddee6fb0c72a98fd86b2eb3a97a813"
        },
        "date": 1790781970189,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32948,
            "range": "± 552",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33532,
            "range": "± 1765",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61983,
            "range": "± 2374",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45199,
            "range": "± 806",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132859,
            "range": "± 446",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108216,
            "range": "± 515",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 135207,
            "range": "± 3881",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107261,
            "range": "± 460",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70223,
            "range": "± 192",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55556,
            "range": "± 100",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132373,
            "range": "± 1703",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108171,
            "range": "± 1742",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3087992200,
            "range": "± 36419460",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4120,
            "range": "± 452",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7165,
            "range": "± 1268",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6203,
            "range": "± 242",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 9065,
            "range": "± 94",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9865,
            "range": "± 395",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15650,
            "range": "± 518",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 397720,
            "range": "± 4421",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 512410,
            "range": "± 8816",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 519254,
            "range": "± 6269",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 497667,
            "range": "± 4977",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 454965,
            "range": "± 7450",
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
          "id": "b9065d2cb8db0731a3d5304f5a0962b06d1b5a72",
          "message": "Merge pull request #188 from JohnathonNow/jules-9475511327892669499-af27f1be\n\n⚡ Bolt: [performance improvement]",
          "timestamp": "2026-09-30T08:14:41-07:00",
          "tree_id": "ffdadd0e21366a995f1ff754081f6e1548acbe6b",
          "url": "https://github.com/JohnathonNow/yagdb/commit/b9065d2cb8db0731a3d5304f5a0962b06d1b5a72"
        },
        "date": 1790782055562,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32193,
            "range": "± 193",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34261,
            "range": "± 723",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60778,
            "range": "± 992",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46659,
            "range": "± 233",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129648,
            "range": "± 334",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106872,
            "range": "± 2034",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130616,
            "range": "± 4355",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106315,
            "range": "± 2440",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66656,
            "range": "± 868",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56673,
            "range": "± 141",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130209,
            "range": "± 995",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106660,
            "range": "± 4088",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2854212378,
            "range": "± 31724729",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3904,
            "range": "± 443",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6599,
            "range": "± 1010",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6408,
            "range": "± 3125",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8930,
            "range": "± 489",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9879,
            "range": "± 610",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15566,
            "range": "± 906",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 401988,
            "range": "± 4604",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 512943,
            "range": "± 8259",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 529297,
            "range": "± 8104",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 499950,
            "range": "± 4010",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 440299,
            "range": "± 5765",
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
          "id": "8fb92e31d428b6443726d8a0121a0f1260f0dc17",
          "message": "Refactor graph element extraction functions",
          "timestamp": "2026-09-30T11:15:12-04:00",
          "tree_id": "e54a0ae1ef7a71805e810487785790b199bcd3be",
          "url": "https://github.com/JohnathonNow/yagdb/commit/8fb92e31d428b6443726d8a0121a0f1260f0dc17"
        },
        "date": 1790782068670,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32619,
            "range": "± 92",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34331,
            "range": "± 126",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60694,
            "range": "± 1111",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46927,
            "range": "± 286",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129447,
            "range": "± 1410",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106952,
            "range": "± 696",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130384,
            "range": "± 565",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107091,
            "range": "± 1823",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66639,
            "range": "± 286",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56275,
            "range": "± 259",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130572,
            "range": "± 697",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106655,
            "range": "± 536",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2790109445,
            "range": "± 20962314",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3795,
            "range": "± 108",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6455,
            "range": "± 286",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6186,
            "range": "± 209",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8915,
            "range": "± 267",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9770,
            "range": "± 310",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15302,
            "range": "± 454",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 395271,
            "range": "± 3380",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 508844,
            "range": "± 7433",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 524521,
            "range": "± 8417",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 496390,
            "range": "± 3384",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 438438,
            "range": "± 8593",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "748ff3cbc43701f34dfeef373edd03fbcadbd41f",
          "message": "⚡ Bolt: [performance improvement]",
          "timestamp": "2026-09-30T15:12:52Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/188/commits/748ff3cbc43701f34dfeef373edd03fbcadbd41f"
        },
        "date": 1790782070526,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33467,
            "range": "± 201",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34570,
            "range": "± 418",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60600,
            "range": "± 1276",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46751,
            "range": "± 643",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129666,
            "range": "± 2920",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106638,
            "range": "± 1891",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129965,
            "range": "± 2712",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106924,
            "range": "± 364",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66304,
            "range": "± 751",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56482,
            "range": "± 749",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130894,
            "range": "± 2311",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106690,
            "range": "± 1438",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2891737898,
            "range": "± 25894018",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3783,
            "range": "± 117",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6462,
            "range": "± 140",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6121,
            "range": "± 215",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8838,
            "range": "± 303",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9705,
            "range": "± 350",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15255,
            "range": "± 514",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 395431,
            "range": "± 9236",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 506244,
            "range": "± 8635",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 518600,
            "range": "± 5859",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 490893,
            "range": "± 10111",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 440433,
            "range": "± 7328",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "4bb6f2fec6ca65a1a2815a36539d420b97b0cc81",
          "message": "⚡ Jules: [bug fix] update `rand()` to return a random float and support WASM",
          "timestamp": "2026-09-30T15:15:17Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/189/commits/4bb6f2fec6ca65a1a2815a36539d420b97b0cc81"
        },
        "date": 1790782952120,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 25581,
            "range": "± 435",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 26203,
            "range": "± 79",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 48114,
            "range": "± 137",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 34824,
            "range": "± 288",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 103769,
            "range": "± 264",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 87746,
            "range": "± 162",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 110424,
            "range": "± 2310",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 90063,
            "range": "± 847",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 54247,
            "range": "± 3158",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 44258,
            "range": "± 98",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 103351,
            "range": "± 1997",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 88234,
            "range": "± 1154",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2704746657,
            "range": "± 20507532",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3238,
            "range": "± 129",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 5586,
            "range": "± 128",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 4749,
            "range": "± 431",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 6997,
            "range": "± 91",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 7506,
            "range": "± 341",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 11808,
            "range": "± 395",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 310689,
            "range": "± 3703",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 405605,
            "range": "± 7476",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 411925,
            "range": "± 7090",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 393715,
            "range": "± 5596",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 360210,
            "range": "± 5410",
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
          "id": "4b87c377ffa68309424176d7faf632c0891b408f",
          "message": "Merge pull request #189 from JohnathonNow/fix-rand-function-7871013227536149997\n\n⚡ Jules: [bug fix] update `rand()` to return a random float and support WASM",
          "timestamp": "2026-09-30T08:33:58-07:00",
          "tree_id": "cedf93ed3ff2c9dfeede361991e5525c21d57f2f",
          "url": "https://github.com/JohnathonNow/yagdb/commit/4b87c377ffa68309424176d7faf632c0891b408f"
        },
        "date": 1790783116545,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 25626,
            "range": "± 58",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 26416,
            "range": "± 180",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 47864,
            "range": "± 1478",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 35767,
            "range": "± 103",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 103676,
            "range": "± 1341",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 86800,
            "range": "± 233",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104243,
            "range": "± 436",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 87234,
            "range": "± 146",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 54394,
            "range": "± 193",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 44854,
            "range": "± 611",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 103351,
            "range": "± 424",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 87416,
            "range": "± 975",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2567516930,
            "range": "± 9511293",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3258,
            "range": "± 78",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 5668,
            "range": "± 92",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 4789,
            "range": "± 342",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 6966,
            "range": "± 89",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 7575,
            "range": "± 291",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 11943,
            "range": "± 350",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 303248,
            "range": "± 1617",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 396024,
            "range": "± 4822",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 403016,
            "range": "± 3829",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 384674,
            "range": "± 2070",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 352102,
            "range": "± 4693",
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
          "id": "4ae92866af9c3736c211122d94a274cfeb1e5140",
          "message": "Refactor network initialization and error handling\n\nRefactor network initialization to handle errors and set node/edge data to null initially.",
          "timestamp": "2026-09-30T12:16:21-04:00",
          "tree_id": "113367348be5c8e5bae36a702286a62ae0daf4de",
          "url": "https://github.com/JohnathonNow/yagdb/commit/4ae92866af9c3736c211122d94a274cfeb1e5140"
        },
        "date": 1790785748519,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32918,
            "range": "± 641",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34389,
            "range": "± 194",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 63331,
            "range": "± 1842",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46575,
            "range": "± 1860",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129753,
            "range": "± 416",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106651,
            "range": "± 1640",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130345,
            "range": "± 1446",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106716,
            "range": "± 335",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66169,
            "range": "± 194",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55623,
            "range": "± 103",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129996,
            "range": "± 866",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 118733,
            "range": "± 700",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2762528623,
            "range": "± 21481613",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3840,
            "range": "± 110",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6472,
            "range": "± 118",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6173,
            "range": "± 219",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8837,
            "range": "± 156",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9804,
            "range": "± 301",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15261,
            "range": "± 392",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 398927,
            "range": "± 4089",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 512820,
            "range": "± 30776",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 525685,
            "range": "± 4732",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 494685,
            "range": "± 12825",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 441175,
            "range": "± 6184",
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
          "id": "c05dc2e182aafbd33b17595d63156e9405c605ec",
          "message": "Change error logging from console.err to console.log",
          "timestamp": "2026-09-30T12:19:51-04:00",
          "tree_id": "c4adec6fa1871f203f578cede694fdd6beb3b306",
          "url": "https://github.com/JohnathonNow/yagdb/commit/c05dc2e182aafbd33b17595d63156e9405c605ec"
        },
        "date": 1790785797630,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 17279,
            "range": "± 144",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 20859,
            "range": "± 419",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 33494,
            "range": "± 736",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 23531,
            "range": "± 606",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69120,
            "range": "± 2361",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55507,
            "range": "± 1576",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69492,
            "range": "± 1285",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 60548,
            "range": "± 1117",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 36170,
            "range": "± 2286",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 29152,
            "range": "± 1070",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70349,
            "range": "± 2645",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 55392,
            "range": "± 1096",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2102096582,
            "range": "± 35028482",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2338,
            "range": "± 79",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 4238,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 3553,
            "range": "± 273",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 5165,
            "range": "± 137",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 5615,
            "range": "± 455",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 8979,
            "range": "± 287",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 216032,
            "range": "± 4417",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 289123,
            "range": "± 6022",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 296462,
            "range": "± 5701",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 284257,
            "range": "± 12978",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 260688,
            "range": "± 4644",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "b2e8c19c7ed2dc47bc14ce805ab1e22830dfdbd9",
          "message": "feat: Allow `date()` and `datetime()` to return current time",
          "timestamp": "2026-09-30T16:19:56Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/190/commits/b2e8c19c7ed2dc47bc14ce805ab1e22830dfdbd9"
        },
        "date": 1790786101635,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 17310,
            "range": "± 121",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 18173,
            "range": "± 865",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 32036,
            "range": "± 2957",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 23499,
            "range": "± 248",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 69427,
            "range": "± 2599",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55313,
            "range": "± 878",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67061,
            "range": "± 2267",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55903,
            "range": "± 7496",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 33182,
            "range": "± 510",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 28370,
            "range": "± 478",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 68847,
            "range": "± 925",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 55704,
            "range": "± 569",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 1982200377,
            "range": "± 33292893",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2383,
            "range": "± 109",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 4166,
            "range": "± 199",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 3529,
            "range": "± 313",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 5093,
            "range": "± 77",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 5507,
            "range": "± 285",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 8851,
            "range": "± 908",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 218271,
            "range": "± 7974",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 300695,
            "range": "± 43493",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 297416,
            "range": "± 9970",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 301433,
            "range": "± 13238",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 258590,
            "range": "± 4237",
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
          "id": "c3499eb14db9d2e0dfdb0d8a66bd13f0c36d8212",
          "message": "Merge pull request #190 from JohnathonNow/fix-date-datetime-no-args-5631452071876497661\n\nfeat: Allow `date()` and `datetime()` to return current time",
          "timestamp": "2026-09-30T09:26:43-07:00",
          "tree_id": "9a6ab051adab824695191f86c3592acf012d850f",
          "url": "https://github.com/JohnathonNow/yagdb/commit/c3499eb14db9d2e0dfdb0d8a66bd13f0c36d8212"
        },
        "date": 1790786361985,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32841,
            "range": "± 617",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34113,
            "range": "± 154",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 63210,
            "range": "± 1203",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47403,
            "range": "± 1163",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129581,
            "range": "± 1913",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106951,
            "range": "± 545",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129555,
            "range": "± 441",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106805,
            "range": "± 461",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66559,
            "range": "± 457",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56537,
            "range": "± 1798",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130177,
            "range": "± 1349",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107910,
            "range": "± 483",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2855157560,
            "range": "± 28276624",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3779,
            "range": "± 115",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6465,
            "range": "± 135",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6108,
            "range": "± 220",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8712,
            "range": "± 145",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9712,
            "range": "± 336",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15345,
            "range": "± 461",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 404860,
            "range": "± 3331",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 511826,
            "range": "± 10498",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 525663,
            "range": "± 6653",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 498386,
            "range": "± 4646",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 438153,
            "range": "± 6388",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "34d891dcc16fdd06e0081bfd20bc92575acfaac6",
          "message": "⚡ Jules: [feature] add arithmetic expressions",
          "timestamp": "2026-09-30T16:26:49Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/191/commits/34d891dcc16fdd06e0081bfd20bc92575acfaac6"
        },
        "date": 1790787259361,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33033,
            "range": "± 1396",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 33719,
            "range": "± 669",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61572,
            "range": "± 644",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 45908,
            "range": "± 82",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133869,
            "range": "± 822",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107148,
            "range": "± 786",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132601,
            "range": "± 6272",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107229,
            "range": "± 2049",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70163,
            "range": "± 295",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55597,
            "range": "± 194",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 133272,
            "range": "± 1508",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 108039,
            "range": "± 1650",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3102388620,
            "range": "± 24240689",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4136,
            "range": "± 362",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7295,
            "range": "± 974",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6080,
            "range": "± 3024",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8964,
            "range": "± 415",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9675,
            "range": "± 391",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15506,
            "range": "± 484",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 393899,
            "range": "± 4060",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 508822,
            "range": "± 11316",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 519492,
            "range": "± 6032",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 498250,
            "range": "± 3880",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 456320,
            "range": "± 7148",
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
          "id": "a106a62ce1a6af4aa667d2012587fda6078448ba",
          "message": "Merge pull request #191 from JohnathonNow/feature/arithmetic-expressions-16840398578093607090\n\n⚡ Jules: [feature] add arithmetic expressions",
          "timestamp": "2026-09-30T10:11:06-07:00",
          "tree_id": "abf389b5d06dd6ec50e27d1733d0afb7068fe986",
          "url": "https://github.com/JohnathonNow/yagdb/commit/a106a62ce1a6af4aa667d2012587fda6078448ba"
        },
        "date": 1790789015661,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32093,
            "range": "± 560",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34338,
            "range": "± 229",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62271,
            "range": "± 1575",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47214,
            "range": "± 193",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130080,
            "range": "± 1844",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106515,
            "range": "± 568",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129890,
            "range": "± 993",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106432,
            "range": "± 1242",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66023,
            "range": "± 1588",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55785,
            "range": "± 174",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130076,
            "range": "± 1125",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106336,
            "range": "± 2026",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2676081210,
            "range": "± 18284458",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3732,
            "range": "± 104",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6452,
            "range": "± 120",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6244,
            "range": "± 203",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8709,
            "range": "± 103",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9762,
            "range": "± 322",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15287,
            "range": "± 428",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 388883,
            "range": "± 3813",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 499453,
            "range": "± 6460",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 513265,
            "range": "± 5291",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 484473,
            "range": "± 3295",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 434183,
            "range": "± 6988",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "77998380f2a56db20620452c0cd39f2e27c9e3f0",
          "message": "⚡ Bolt: [performance improvement] Precompute NodePattern labels in PathExpand and FullNodeScan",
          "timestamp": "2026-09-30T17:11:12Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/192/commits/77998380f2a56db20620452c0cd39f2e27c9e3f0"
        },
        "date": 1790793269835,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 18520,
            "range": "± 375",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 17914,
            "range": "± 365",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 32466,
            "range": "± 1295",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 24326,
            "range": "± 739",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 70632,
            "range": "± 1719",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55240,
            "range": "± 564",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 73305,
            "range": "± 3130",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56405,
            "range": "± 2796",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 35181,
            "range": "± 819",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 29017,
            "range": "± 339",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 74004,
            "range": "± 6981",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 55324,
            "range": "± 2894",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2208721030,
            "range": "± 48803724",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2432,
            "range": "± 89",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 4275,
            "range": "± 297",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 3669,
            "range": "± 329",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 5343,
            "range": "± 250",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 5797,
            "range": "± 226",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 9377,
            "range": "± 887",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 228324,
            "range": "± 14329",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 312158,
            "range": "± 11133",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 318758,
            "range": "± 5763",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 303540,
            "range": "± 4133",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 269638,
            "range": "± 13778",
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
          "id": "05f596578ead6beee962a4baf10499dcedfda5e9",
          "message": "Merge pull request #192 from JohnathonNow/bolt-opt-label-resolution-608243619738794674\n\n⚡ Bolt: [performance improvement] Precompute NodePattern labels in PathExpand and FullNodeScan",
          "timestamp": "2026-09-30T11:26:03-07:00",
          "tree_id": "55a1a8a9baebce16ee344360e901c31516e9037c",
          "url": "https://github.com/JohnathonNow/yagdb/commit/05f596578ead6beee962a4baf10499dcedfda5e9"
        },
        "date": 1790793464129,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 23534,
            "range": "± 532",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 24628,
            "range": "± 909",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 44846,
            "range": "± 1155",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 34268,
            "range": "± 800",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104521,
            "range": "± 3766",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 82909,
            "range": "± 2108",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 104077,
            "range": "± 2414",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 82740,
            "range": "± 1844",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 52120,
            "range": "± 4142",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 44296,
            "range": "± 1189",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 103353,
            "range": "± 2545",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 84662,
            "range": "± 2587",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2379615629,
            "range": "± 23460079",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2997,
            "range": "± 102",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 5516,
            "range": "± 172",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5302,
            "range": "± 294",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 7137,
            "range": "± 195",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 8693,
            "range": "± 401",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 14002,
            "range": "± 516",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 298536,
            "range": "± 5665",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 405515,
            "range": "± 8319",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 427290,
            "range": "± 10743",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 421479,
            "range": "± 6549",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 353904,
            "range": "± 6985",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "a8dd5468c1f13f1d51219ec4fba5700005468da1",
          "message": "Revert \"⚡ Bolt: [performance improvement] Precompute NodePattern labels in PathExpand and FullNodeScan\"",
          "timestamp": "2026-09-30T18:26:13Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/193/commits/a8dd5468c1f13f1d51219ec4fba5700005468da1"
        },
        "date": 1790793533714,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32106,
            "range": "± 637",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34233,
            "range": "± 1221",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62159,
            "range": "± 473",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47329,
            "range": "± 756",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129634,
            "range": "± 9038",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106710,
            "range": "± 903",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 132740,
            "range": "± 459",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108720,
            "range": "± 1561",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66254,
            "range": "± 4665",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 57013,
            "range": "± 3563",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130045,
            "range": "± 619",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106766,
            "range": "± 1007",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2788592823,
            "range": "± 24700840",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3786,
            "range": "± 115",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6561,
            "range": "± 129",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6141,
            "range": "± 198",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8837,
            "range": "± 123",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9765,
            "range": "± 1120",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15401,
            "range": "± 553",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 387510,
            "range": "± 4502",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 512463,
            "range": "± 7467",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 523316,
            "range": "± 6556",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 482838,
            "range": "± 4460",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 442543,
            "range": "± 7012",
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
          "id": "c60f773db4295e914392210d295eb9cd7e06d8e5",
          "message": "Merge pull request #193 from JohnathonNow/revert-192-bolt-opt-label-resolution-608243619738794674\n\nRevert \"⚡ Bolt: [performance improvement] Precompute NodePattern labels in PathExpand and FullNodeScan\"",
          "timestamp": "2026-09-30T11:26:26-07:00",
          "tree_id": "abf389b5d06dd6ec50e27d1733d0afb7068fe986",
          "url": "https://github.com/JohnathonNow/yagdb/commit/c60f773db4295e914392210d295eb9cd7e06d8e5"
        },
        "date": 1790793549249,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 32841,
            "range": "± 960",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34246,
            "range": "± 218",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62125,
            "range": "± 627",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47848,
            "range": "± 423",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129803,
            "range": "± 572",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106200,
            "range": "± 433",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130352,
            "range": "± 707",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107221,
            "range": "± 1036",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66054,
            "range": "± 3381",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 56556,
            "range": "± 550",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130067,
            "range": "± 4382",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106943,
            "range": "± 179",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2792134610,
            "range": "± 25429168",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3730,
            "range": "± 677",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6446,
            "range": "± 678",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 5982,
            "range": "± 4584",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8655,
            "range": "± 422",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 9513,
            "range": "± 314",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15112,
            "range": "± 391",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 392125,
            "range": "± 4126",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 509285,
            "range": "± 11389",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 518313,
            "range": "± 6209",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 486914,
            "range": "± 3746",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 443024,
            "range": "± 7333",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "01af19deee3a32fc3f10ff26a7d8db74f377460b",
          "message": "⚡ Jules: [bugfix] Parse math expressions with function calls correctly",
          "timestamp": "2026-09-30T18:26:35Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/194/commits/01af19deee3a32fc3f10ff26a7d8db74f377460b"
        },
        "date": 1790793988155,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33475,
            "range": "± 292",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34479,
            "range": "± 168",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62186,
            "range": "± 1143",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46907,
            "range": "± 210",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130161,
            "range": "± 837",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108232,
            "range": "± 902",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129836,
            "range": "± 534",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107360,
            "range": "± 1925",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66303,
            "range": "± 145",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55810,
            "range": "± 1053",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131313,
            "range": "± 2146",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107623,
            "range": "± 536",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2809744668,
            "range": "± 33523177",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3802,
            "range": "± 95",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6487,
            "range": "± 133",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6572,
            "range": "± 196",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 9257,
            "range": "± 122",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 10348,
            "range": "± 292",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 16201,
            "range": "± 411",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 400479,
            "range": "± 3771",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 517825,
            "range": "± 6495",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 528471,
            "range": "± 7567",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 492888,
            "range": "± 15115",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 441076,
            "range": "± 5834",
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
          "id": "9a991cd586956d9a97cf255b4d4a5e7fe66a0ee9",
          "message": "Merge pull request #194 from JohnathonNow/jules-parser-math-fix-1745871766929217867\n\n⚡ Jules: [bugfix] Parse math expressions with function calls correctly",
          "timestamp": "2026-09-30T11:48:06-07:00",
          "tree_id": "66c6ab80c84bae3ed37327f4be73c40d3fd8682b",
          "url": "https://github.com/JohnathonNow/yagdb/commit/9a991cd586956d9a97cf255b4d4a5e7fe66a0ee9"
        },
        "date": 1790794681414,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 17274,
            "range": "± 110",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 18076,
            "range": "± 361",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 31672,
            "range": "± 582",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 26522,
            "range": "± 232",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 68407,
            "range": "± 552",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55358,
            "range": "± 625",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 67177,
            "range": "± 2205",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55372,
            "range": "± 722",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 33232,
            "range": "± 240",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 28141,
            "range": "± 185",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 71392,
            "range": "± 1312",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 55393,
            "range": "± 325",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2118838362,
            "range": "± 19848269",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 2324,
            "range": "± 51",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 4109,
            "range": "± 79",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 3685,
            "range": "± 113",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 5264,
            "range": "± 87",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 5983,
            "range": "± 191",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 9641,
            "range": "± 274",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 213567,
            "range": "± 3527",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 291833,
            "range": "± 4185",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 297848,
            "range": "± 3442",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 283461,
            "range": "± 3264",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 259224,
            "range": "± 4734",
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
          "id": "2db11ee4ad121aab1ecf62eaf4973f8bc072b3c7",
          "message": "Refactor find_nodes to use precomputed label IDs",
          "timestamp": "2026-09-30T14:49:24-04:00",
          "tree_id": "d4f5e05d8581c8a54e7358e1f19963720bbd9a7e",
          "url": "https://github.com/JohnathonNow/yagdb/commit/2db11ee4ad121aab1ecf62eaf4973f8bc072b3c7"
        },
        "date": 1790794864178,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 28126,
            "range": "± 179",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 29659,
            "range": "± 155",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 52580,
            "range": "± 607",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 39974,
            "range": "± 253",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 117546,
            "range": "± 1785",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 98416,
            "range": "± 825",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 116701,
            "range": "± 2781",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 97927,
            "range": "± 353",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 60134,
            "range": "± 622",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 51842,
            "range": "± 158",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 116300,
            "range": "± 189",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 98240,
            "range": "± 552",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2239539745,
            "range": "± 14514192",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 3482,
            "range": "± 230",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 6172,
            "range": "± 197",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6333,
            "range": "± 441",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 8506,
            "range": "± 172",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 10067,
            "range": "± 698",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 15953,
            "range": "± 762",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 364983,
            "range": "± 4586",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 466950,
            "range": "± 7046",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 492930,
            "range": "± 8259",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 495019,
            "range": "± 4805",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 403157,
            "range": "± 5839",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "6471136dee75af658ac6e432317789c5ec4b429d",
          "message": "⚡ George: [feature improvement]",
          "timestamp": "2026-09-30T18:49:30Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/195/commits/6471136dee75af658ac6e432317789c5ec4b429d"
        },
        "date": 1790871745191,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 26240,
            "range": "± 188",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 28258,
            "range": "± 250",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 49765,
            "range": "± 312",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 37763,
            "range": "± 107",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 120750,
            "range": "± 500",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 99743,
            "range": "± 659",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 117951,
            "range": "± 1838",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 97213,
            "range": "± 2659",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 59807,
            "range": "± 747",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 48801,
            "range": "± 458",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 120188,
            "range": "± 371",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 99359,
            "range": "± 1472",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2520965430,
            "range": "± 21454574",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4112,
            "range": "± 244",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7090,
            "range": "± 310",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 6931,
            "range": "± 518",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 9042,
            "range": "± 343",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 10874,
            "range": "± 678",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 16854,
            "range": "± 796",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 344606,
            "range": "± 6163",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 468755,
            "range": "± 11393",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 479389,
            "range": "± 11951",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 478413,
            "range": "± 15262",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 408176,
            "range": "± 10089",
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
          "id": "4f244a6186042fffd7cab4ce7d541ba52c1e24e3",
          "message": "Merge pull request #195 from JohnathonNow/george-feature-cypher-functions-10568617187857177274\n\n⚡ George: [feature improvement]",
          "timestamp": "2026-10-01T11:05:45-07:00",
          "tree_id": "6fd8be3d6dac2a26477857956763674338090296",
          "url": "https://github.com/JohnathonNow/yagdb/commit/4f244a6186042fffd7cab4ce7d541ba52c1e24e3"
        },
        "date": 1790878719066,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33096,
            "range": "± 155",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34216,
            "range": "± 192",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 61503,
            "range": "± 1285",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 46359,
            "range": "± 266",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 131637,
            "range": "± 4022",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 107255,
            "range": "± 719",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130297,
            "range": "± 1316",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106304,
            "range": "± 227",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 68283,
            "range": "± 945",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 54448,
            "range": "± 785",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130413,
            "range": "± 348",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 107792,
            "range": "± 620",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 3079075836,
            "range": "± 19638305",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 5083,
            "range": "± 617",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 8375,
            "range": "± 4194",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 7406,
            "range": "± 430",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 10589,
            "range": "± 279",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 11618,
            "range": "± 606",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 17785,
            "range": "± 688",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 410555,
            "range": "± 3912",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 552346,
            "range": "± 8876",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 551654,
            "range": "± 6473",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 516648,
            "range": "± 3798",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 494843,
            "range": "± 7761",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "345cb221cec093d36a4b9c33b4a9b1b3c05e190a",
          "message": "⚡ Bolt: [performance improvement]",
          "timestamp": "2026-10-01T18:05:51Z",
          "url": "https://github.com/JohnathonNow/yagdb/pull/196/commits/345cb221cec093d36a4b9c33b4a9b1b3c05e190a"
        },
        "date": 1790879017893,
        "tool": "cargo",
        "benches": [
          {
            "name": "entry",
            "value": 33158,
            "range": "± 617",
            "unit": "ns/iter"
          },
          {
            "name": "get_mut_insert",
            "value": 34923,
            "range": "± 500",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 62089,
            "range": "± 1524",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 47352,
            "range": "± 1119",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129454,
            "range": "± 1138",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 106388,
            "range": "± 4609",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 130824,
            "range": "± 893",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 108212,
            "range": "± 367",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 66754,
            "range": "± 799",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer",
            "value": 55970,
            "range": "± 1450",
            "unit": "ns/iter"
          },
          {
            "name": "allocate_every_time",
            "value": 129818,
            "range": "± 3241",
            "unit": "ns/iter"
          },
          {
            "name": "reuse_buffer_both",
            "value": 106752,
            "range": "± 492",
            "unit": "ns/iter"
          },
          {
            "name": "intersect_slow",
            "value": 2829069809,
            "range": "± 22236027",
            "unit": "ns/iter"
          },
          {
            "name": "create_node",
            "value": 4736,
            "range": "± 306",
            "unit": "ns/iter"
          },
          {
            "name": "create_relationship",
            "value": 7608,
            "range": "± 356",
            "unit": "ns/iter"
          },
          {
            "name": "match_node",
            "value": 7380,
            "range": "± 354",
            "unit": "ns/iter"
          },
          {
            "name": "create_and_match",
            "value": 10500,
            "range": "± 301",
            "unit": "ns/iter"
          },
          {
            "name": "match_relationship",
            "value": 11667,
            "range": "± 760",
            "unit": "ns/iter"
          },
          {
            "name": "match_complex_path",
            "value": 17558,
            "range": "± 820",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_heavy/ops",
            "value": 413685,
            "range": "± 13773",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_heavy/ops",
            "value": 552841,
            "range": "± 10099",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_balanced/ops",
            "value": 560761,
            "range": "± 12501",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_read_only/ops",
            "value": 506943,
            "range": "± 7008",
            "unit": "ns/iter"
          },
          {
            "name": "throughput_write_only/ops",
            "value": 475183,
            "range": "± 11874",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}