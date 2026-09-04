window.BENCHMARK_DATA = {
  "lastUpdate": 1788491195328,
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
      }
    ]
  }
}